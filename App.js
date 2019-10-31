import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Constants from 'expo-constants'

import Feed from './screens/Feed'
import Comments from './screens/Comments'


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentsForItem: [], // [{id: 0, comments: []}, {id: 1, comments: []}]
      showComments: false, 
      selectedItemId: null,
    };
  };

  onPressCloseComments = (comments) => {
    const { commentsForItem, selectedItemId} = this.state;
    index = commentsForItem.findIndex((item)=>(item.id===selectedItemId))
    console.log(index)
    if(index===-1){
      this.setState({
        showComments: false,
        commentsForItem: [...commentsForItem, 
                          {id: selectedItemId, comments: comments},]
      });
    }
    else {
      let updatedArray = commentsForItem
      updatedArray[index] = {...updatedArray[index], comments: comments}

      this.setState({
        showComments: false,
        commentsForItem: updatedArray
      });
  }
};

  onPressFeedComments = id => {
    this.setState({
      showComments: true, 
      selectedItemId: id,
    });
  };

  render (){
    const { showComments, commentsForItem, selectedItemId } = this.state;
    if(showComments){
      const item = commentsForItem.find((item)=>(item.id===selectedItemId))
      if(item) {
        comments = item.comments;
      }
      else comments=null;
      return (
        <View style={styles.container}>
            <Comments comments={comments} onPressClose={this.onPressCloseComments}/>
        </View>
      );
    }
    else{
      return (
        <View style={styles.container}>
            <Feed  style={styles.feed} onPressComments={this.onPressFeedComments}/>
        </View>
      );
    }
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
