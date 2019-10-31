import React from 'react'
import { FlatList} from 'react-native'

import Card from './Card'
import {getImageFromId} from '../utils/api'
import PropTypes from 'prop-types'

export default class CardList extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                author: PropTypes.string.isRequired,
            })
        ).isRequired,
    };

    renderItem = ({ item }) => {
        const { onPressComments } = this.props;
        return (
            <Card
                id={item.id}
                fullname={item.author}
                image={{uri: getImageFromId(item.id),}}
                onPressComments={onPressComments}
            />
        ); 
};

    render (){
        const { items } = this.props;

        return ( 
            <FlatList 
                data={items} 
                renderItem={this.renderItem} 
                keyExtractor={item => item.id.toString()} 
            />
);
}}



// [
//     { id: 0, author: "Bob Ross" },
//     { id: 1, author: "Chuck Norris" }
//   ];
  