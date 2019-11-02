import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Constants from 'expo-constants'

import AppNavigator from './routes'


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentsForItem: [], // [{id: 0, comments: []}, {id: 1, comments: []}]
      showComments: false, 
      selectedItemId: null,
    };
  };

  render (){
    return <AppNavigator />
  }
};

const platformVersion = Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
  cardStyle: {
    height: 100
  },
  feed: {
    flex: 1,
    marginTop: Platform.OS === 'android' || platformVersion < 11 ? Constants.statusBarHeight : 0,
  },
});
