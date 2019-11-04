import React from 'react'
import {StyleSheet, View, TextInput, } from 'react-native'


export default class CommentInput extends React.Component {
    state = {
        comment: '',
    };

    onChangeText = comment => {
        this.setState({
            comment: comment,
        });
    }

    handleSubmitEditing = () => {
        const { comment } = this.state
        const { onSubmitEditing } = this.props;

        onSubmitEditing(comment);
        this.setState({
            comment: '',
        });
    }

    render () {
        const { comment } = this.state;

        return (
            <View style={styles.container}>
                <TextInput 
                style={styles.input}
                value={comment}
                placeholder={"Add your comment"}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.handleSubmitEditing} />
            </View>
            
        );
    }
}

const styles = StyleSheet.create({ 
    container: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 20,
        height: 60,
    }, 
    input: {
        flex: 1, },
});