import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';


import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '..//components/DefaultText'


const CategoryMealScreen = props => {

    const catId = props.route.params.categoryId;
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    useEffect(() => {
        props.navigation.setOptions({ title: selectedCategory.title });
    });
    const availableMeals = useSelector(state => state.meals.filteredMeals);
    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    if (displayedMeals.length === 0 || !displayedMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>No meals found. check filters</DefaultText>
            </View>
        );
    }

    return <MealList listData={displayedMeals} navigation={props.navigation} />
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default CategoryMealScreen;