import React from 'react'
import {StyleSheet, View, ScrollView, Text} from 'react-native'

import PropTypes from 'prop-types';


export default class CommentList extends React.Component {
    renderItem = (comment, index) => {
        return (
            <View key={index} style={styles.comment}>
                <Text>{comment}</Text>
            </View>);
        
    };

    render () {
        const { comments } = this.props;
        if(comments){
            return <ScrollView>{comments.map(this.renderItem)}</ScrollView>;
        }
        else{
            return <View style={styles.comment}><Text>{"No Comments Yet"}</Text></View>;
        }
    };

}

const styles = StyleSheet.create({ 
    comment: {
        marginLeft: 20,
        paddingVertical: 20,
        paddingRight: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    }, 
});
     