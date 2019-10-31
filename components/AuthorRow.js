import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

import Avatar from './Avatar'


export default function AuthorRow({ fullname, avatar, linkText, onPressLinkText }){

        
    return (
        <View style={styles.container}>
            <Avatar fullname={fullname} avatar={avatar} />
            <Text style={styles.sectionStyle} numberOfLines={1}>{fullname}</Text>
            {
                !! {linkText} 
                && <TouchableOpacity onPress={onPressLinkText}>
                    <Text>{linkText}</Text>
                </TouchableOpacity>
            }
        </View>
        
    )
}

const styles = StyleSheet.create({
    container : {
        height: 50,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal: 20
    },
    sectionStyle : { 
        flex : 1,
        marginHorizontal: 6,
    }
});

AuthorRow.propTypes = {
    fullname : PropTypes.string.isRequired,
    linkText : PropTypes.string.isRequired,
    onPressLinkText : PropTypes.func.isRequired
}