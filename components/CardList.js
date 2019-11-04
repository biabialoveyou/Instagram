import React from 'react'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

import Card from './Card'
import {getImageFromId} from '../utils/api'
import PropTypes from 'prop-types'

export default class CardList extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onPressComments: PropTypes.func.isRequired,
        onPressUsername:PropTypes.func.isRequired,
        onPressFinishComments:PropTypes.func.isRequired,
        onPressInputComments: PropTypes.func.isRequired,
    };

    renderItem = ({ item }) => {
        const { onPressComments, onPressUsername, onPressFinishComments, onPressInputComments } = this.props;
        return (
            <Card
                data={item}
                onPressComments={onPressComments}
                onPressUsername={onPressUsername}
                onPressFinishComments={onPressFinishComments}
                onPressInputComments={onPressInputComments}
            />
        ); 
};

    render (){
        const { items } = this.props;
        return ( 
            <KeyboardAwareFlatList 
                data={items} 
                renderItem={this.renderItem} 
                keyExtractor={item => item.id.toString()} 
                onEndReached={()=>{}}
            />
);
}}



// [
//     { id: 0, author: "Bob Ross" },
//     { id: 1, author: "Chuck Norris" }
//   ];
  