import React from 'react';
import {
    FlatList,
    StyleSheet,
} from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';


const CategoriesScreen = props => {

    const { navigation } = props;
    navigation.closeDrawer();

    const renderGridItem = itemData => {
        return (<CategoryGridTile
            title={itemData.item.title}
            color={itemData.item.color}
            onSelect={() => {
                props.navigation.navigate('CategoryMeals',
                    {
                        categoryId: itemData.item.id
                    }
                )
            }}
        />);
    }

    return (
        <FlatList
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
}

CategoriesScreen.navigationOptions = {
    headerTitle: "Meal Categories",
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default CategoriesScreen;