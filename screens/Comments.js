import React from 'react';
import { View } from 'react-native';

import NavigationBar from '../components/NavigationBar';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';


export default class Comments extends React.Component {
    state = {
        comments: this.props.comments,
    }

    handleSubmitEditing = newComment => {
        const { comments } = this.state;

        if(comments){
            this.setState({
                comments: [...comments, newComment]
            });
        }
        else{
            this.setState({
                comments: [newComment]
            });
        }
    };

    handleCloseComments = () => {
        const { comments } = this.state;
        const { onPressClose } = this.props;
        onPressClose(comments)
    };

    render () {
        const { comments } = this.state;
        return (
            <View>
                <NavigationBar 
                    title={"Comments"} 
                    leftText={"Close"} 
                    onPressLeftText={this.handleCloseComments}/>
                <CommentInput onSubmitEditing={this.handleSubmitEditing}/>
                <CommentList comments={comments}/>
            </View>
        );
    }
};
