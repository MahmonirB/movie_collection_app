// libs
import React, { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { modifyCategoryItem } from 'store/actions/actionCategory';
// components
import axios from 'utilities/AxiosInstance';
import {
  CategoryListItem,
  ICategoryItemData,
  ICategoryData,
} from 'components/CategoryListItem';
// styles
import styles from './styles';
import { colors } from 'utilities/styles/variables';

/**
 * @interface IResponseData
 */
interface IResponseData {
  status: number;
  data: ICategoryResponse;
}
/**
 * @interface ICategoryResponse
 */
interface ICategoryResponse {
  count?: number;
  results?: Array<ICategoryData>;
}
/**
 * @interface ICategoryList
 */
interface ICategoryList {
  navigation?: NavigationStackProp;
  modifyCategoryItem: (value: string) => {};
}

const ITEM_HEIGHT = 100; // height of each element
const limitNum = 20;

const CategoryList: NavigationScreenComponent<any, ICategoryList> = (
  props: ICategoryList,
) => {
  const { navigation } = props;
  const [categoryData, setCategoryData] = useState<ICategoryResponse>({});
  const [hasMore, setHasMore] = useState(false);
  const offset = useRef(1);
  const mountStatus = useRef(true); // for aboart controlling withing async func

  useEffect(() => {
    renderToGetData();
    return () => (mountStatus.current = false);
  }, []);
  /**
   * @name renderToGetData
   * @description get categorys data from IMD service
   */
  const renderToGetData = async () => {
    try {
      const responseData: IResponseData = await axios.get(
        `/category/?limit=${limitNum}&offset=${offset.current}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (responseData.status === 200) {
        mountStatus.current && setCategoryData(responseData.data);
      } else {
        ToastAndroid.show('Error in request', 5000);
      }
    } catch (error) {
      ToastAndroid.show(`Error in fetch data ${error.response.status}`, 5000);
    }
  };

  /**
   * @name selectCategoryItem
   * @description set a category name to redux store and navigate to show list of it
   */
  const selectCategoryItem = (catName: string): void => {
    props.modifyCategoryItem(catName);
    navigation?.navigate('CategoryMovie');
  };

  /**
   * @name renderItem
   * @param param0
   */
  const renderItemFunction = (catItemData: ICategoryItemData) => (
    <CategoryListItem
      onClick={() => selectCategoryItem(catItemData.item.name)}
      CategoryItemData={catItemData}
    />
  );

  /**
   * @name onEndReachCategory
   * @async
   * @description onEndReachCategory trigger when scroll reach to end and get next page
   */
  const onEndReachCategory = async () => {
    setHasMore(true);
    if (categoryData.count > offset.current + limitNum) {
      offset.current = offset.current + limitNum;
      await renderToGetData();
    }
    setHasMore(false);
  };

  /**
   * @name pullToRefresh
   * @description pullToRefresh trigger to get previous page of category data
   */
  const pullToRefresh = () => {
    if (offset.current >= limitNum) {
      offset.current = offset.current - limitNum;
      renderToGetData();
    }
  };

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.titleStyle}>Category List</Text>
      <FlatList
        data={categoryData.results}
        renderItem={renderItemFunction}
        keyExtractor={(item) => String(item.id)}
        onEndReached={onEndReachCategory}
        onEndReachedThreshold={0.1}
        maxToRenderPerBatch={6}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={pullToRefresh}
            colors={[colors.activeBlue]}
            tintColor={colors.activeBlue}
            size={40}
          />
        }
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
      <View>{hasMore && <ActivityIndicator color="blue" size={30} />}</View>
    </View>
  );
};
const mapStateToProps = (state: any) => {
  return {
    category: state.category,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    modifyCategoryItem: (categoryItem: string) => {
      dispatch(modifyCategoryItem(categoryItem));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
