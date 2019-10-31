import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

import Avatar from './Avatar'


export default function AuthorRow({ fullname, linkText, onPressLinkText }){
    names = fullname.split(" ")
    initials = names[0].charAt(0)
    if (names.length > 1){
        initials += names[1].charAt(0)
    }

    getAvatarColor = (name) => {
        const hexCode = name
          .split('')
          .reduce((acc, char) => (acc * char.charCodeAt(0)) % 0xffffff, 1)
          .toString(16);
      
        return `#${'0'.repeat(6 - hexCode.length) + hexCode}`;
      }
        
    return (
        <View style={styles.container}>
            <Avatar size={40} backgroundColor={this.getAvatarColor(fullname)} initials={initials} />
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