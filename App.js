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

