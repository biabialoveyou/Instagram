import React from 'react';
import { View, 
         StyleSheet,
         TouchableOpacity, 
         ActivityIndicator, 
         Text, 
         ViewPropTypes, 
         SafeAreaView, } from 'react-native';
import FlashMessage from "react-native-flash-message";

import store from '../store'
import { fetchPhotos } from '../utils/api'; 
import CardList from '../components/CardList';
import Comments from '../screens/Comments'


export default class Feed extends React.Component {
    static navigationOptions = {
        title: 'Feed',
      };

    static propTypes = {
        style: ViewPropTypes.style,
      };

    static defaultProps = { 
        style: null,
    };

    state = { 
        isFetchingFeed: store.getState().isFetchingFeed,
        isFetchingFeedError: store.getState().isFetchingFeedError,
        feedItems: store.getState().feedItems,
        commentsForItem: store.getState().commentsForItem, // [{id: 0, comments: []}, {id: 1, comments: []}]
        showComments: store.getState().showComments, 
        selectedItemId: store.getState().selectedItemId,
    };

    async componentWillMount() { 
        this.unsubscribe = store.onChange(() => {
            this.setState({
                isFetchingFeed: store.getState().isFetchingFeed,
                isFetchingFeedError: store.getState().isFetchingFeedError,
                feedItems: store.getState().feedItems,
                commentsForItem: store.getState().commentsForItem,
                showComments: store.getState().showComments, 
                selectedItemId: store.getState().selectedItemId,
            })
        });
        try {
            const feedItems = await fetchPhotos();
            store.setState({ feedItems, isFetchingFeed: false });
        } 
        catch (e) {
            store.setState({ isFetchingFeed: false, isFetchingFeedError: true });
        }
    };

    async componentDidUpdate() {
        try {
            const feedItems = await fetchPhotos();
        } 
        catch (e) {
            store.setState({ isFetchingFeed: false, isFetchingFeedError: true });
        }
    };

    componentWillUnmount() { 
        this.unsubscribe();
    };

    handlePressTryAgain = () => { 
        store.setState({ isFetchingFeed: true, isFetchingFeedError: false,  feedItems:[]});
    };

    onPressUsername = user => {
        const { navigation: { navigate }} = this.props;
        navigate('Route1', { user: user });
    };

    // For comment icon
    onPressFeedComments = id => {
        store.setState({ showComments: true,  selectedItemId: id,})
    };

    onPressCloseComments = newComment => {
        const { commentsForItem, selectedItemId } = store.getState();
        index = commentsForItem.findIndex((item)=>(item.id===selectedItemId))
        if(newComment){
            if(index===-1){
                store.setState({
                    showComments: false,
                    commentsForItem: [...commentsForItem, 
                                    {id: selectedItemId, comments: newComment},]})
            }
            else {
              let updatedArray = commentsForItem
              updatedArray[index] = {...updatedArray[index], comments: newComment}
              store.setState({
                showComments: false,
                commentsForItem: updatedArray
              });
            }
        }
        else{
            store.setState({
                showComments: false,
            });
        };
    };

    // For comment input
    onPressInputComments = id => {
        store.setState({ selectedItemId: id,})
    };

    onPressFinishComments = newComment => {
        const { commentsForItem, selectedItemId } = store.getState();
        index = commentsForItem.findIndex((item)=>(item.id===selectedItemId))
        if(index===-1){
            store.setState({
                commentsForItem: [...commentsForItem, 
                                {id: selectedItemId, comments: [newComment]},]})
        }
        else {
          let updatedArray = commentsForItem
          oldComments = commentsForItem[index].comments
          updatedArray[index] = {...updatedArray[index], comments: oldComments.concat(newComment)}
          store.setState({
            commentsForItem: updatedArray
          });
      }
    };
    
    render() {
        const { style } = this.props;
        const { isFetchingFeed, isFetchingFeedError, feedItems, showComments, commentsForItem, selectedItemId } = store.getState();

        if (isFetchingFeed) {
            return <ActivityIndicator size="large" />;
        }
        if (isFetchingFeedError) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.text}>Sorry! There's connect Errors. </Text>
                    <TouchableOpacity onPress={this.handlePressTryAgain}>
                        <Text style={styles.text}>Tap to try again. </Text>
                    </TouchableOpacity>
                </View>
            );
        }
        if(showComments){
            const item = commentsForItem.find((item)=>(item.id===selectedItemId));
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
                <SafeAreaView style={style} behavior="padding">
                    <CardList items={feedItems} 
                              onPressUsername={this.onPressUsername} 
                              onPressComments={this.onPressFeedComments}
                              onPressInputComments={this.onPressInputComments}
                              onPressFinishComments={this.onPressFinishComments}
                    />
                    <FlashMessage position="top" style={styles.flashMessage}/>
                </SafeAreaView>
            );
        }
    };
};

styles = StyleSheet.create({
    errorContainer: {
        alignItems: 'center',
        paddingTop: 100,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Palatino-Bold',
        fontWeight: 'bold'
    },
    flashMessage: {
        alignItems: 'center',
    }
})
