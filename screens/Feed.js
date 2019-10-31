import React from 'react';
import { ActivityIndicator, Text, ViewPropTypes, SafeAreaView} from 'react-native';

import { fetchImages } from '../utils/api'; 
import CardList from '../components/CardList';


export default class Feed extends React.Component {
    static propTypes = {
        style: ViewPropTypes.style,
      };

    static defaultProps = { 
        style: null,
    };

    state = { 
        loading: true, 
        error: false, 
        items: [],
    };

    async componentWillMount() { 
        try {
            const items = await fetchImages();
            this.setState({ 
                loading: false, 
                items,
            });
        } 
        catch (e) {
            console.log(e)
            this.setState({ 
                loading: false,
                error: true,
            }); 
        }
    };

    render() {
        const { style, onPressComments } = this.props;
        const { loading, error, items } = this.state;

        if (loading) {
            return <ActivityIndicator size="large" />;
        }
        if (error) {
            return <Text>Error...</Text>;
        }
        return (
            <SafeAreaView style={style}>
                <CardList items={items} onPressComments={onPressComments}/>
            </SafeAreaView>
        );
    };
};