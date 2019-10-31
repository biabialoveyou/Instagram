import React from 'react'
import Proptypes from 'prop-types'
import {ColorPropType, StyleSheet, View, Text} from 'react-native'

export default function Avatar({size, backgroundColor, initials}) {
    style = {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
    }
    return (
        <View style={[styles.container, style]}>
            <Text style={{fontSize : 20,}}>{initials}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    }
});



Avatar.Proptypes ={
    initials: Proptypes.string.isRequired,
    size: Proptypes.number.isRequired,
    backgroundColor: ColorPropType.isRequired,
};