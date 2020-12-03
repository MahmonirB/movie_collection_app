// libs
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import {NavigationScreenComponent} from 'react-navigation';
import {NavigationStackProp} from 'react-navigation-stack';
import {connect} from 'react-redux';
import {modifyCategoryItem} from '../../../store/actions/actionCategory';
// components
import axios from '../../../utilities/ AxiosInstance';
import CategoryListItem, {
  ICategoryItemData,
  ICategoryData,
} from '../../../components/CategoryListItem';
// styles
import styles from './styles';

/**
 * @interface ICategoryList
 */
interface ICategoryList {
  navigation?: NavigationStackProp;
  modifyCategoryItem: (value: string) => {};
  categoryItem?: any;
}

const CategoryList: NavigationScreenComponent<any, ICategoryList> = (
  props: ICategoryList,
) => {
  const {navigation} = props;
  const [categoryData, setCategoryData] = useState<Array<ICategoryData>>([]);
  const [limit, setLimit] = useState(20);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    renderToGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * @name renderToGetData
   * @description get categorys data from IMD service
   */
  const renderToGetData = () => {
    setHasMore(true);
    try {
      axios
        .get(`/category/?limit=${limit}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((responseData) => {
          setCategoryData(responseData.data.results);
          setLimit(limit + 20);
          setHasMore(false);
        })
        .catch((error) => {
          ToastAndroid.show(
            `Error in fetch data ${error.response.status}`,
            5000,
          );
        });
    } catch (error) {
      setHasMore(false);
      ToastAndroid.show('Network Error in fetch data', 5000);
    }
  };
  /**
   * @name selectCategoryItem
   */
  const selectCategoryItem = (catName: string): void => {
    props.modifyCategoryItem(catName);
    navigation?.navigate('CategoryMovie');
  };
  /**
   * @name renderItem
   * @param param0
   */
  const rendercategoryItem = (catItemData: ICategoryItemData) => {
    return (
      <CategoryListItem
        onClick={() => selectCategoryItem(catItemData.item.name)}
        CategoryItemData={catItemData}
      />
    );
  };

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.titleStyle}>Category List</Text>
      <FlatList
        data={categoryData}
        renderItem={rendercategoryItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={renderToGetData}
        onEndReachedThreshold={0.7}
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
