// libs
import React from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {addToken, removeToken} from '../store/actions/actionSet';

const HomePage = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addToken: (tokenNumber: string) => {
      dispatch(addToken(tokenNumber));
    },
    removeToken: () => {
      dispatch(removeToken());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
