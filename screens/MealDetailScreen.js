import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

import { toggleFavorite } from '../store/actions/mealsActions';

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>
                {props.children}
            </DefaultText>
        </View>
    )
}

const MealDetailScreen = props => {

    const favMeals = useSelector(state => state.meals.favoriteMeals);

    const availlableMeals = useSelector(state => state.meals.meals);
    const mealId = props.route.params.mealId;
    const selectedMeal = availlableMeals.find(meal => meal.id === mealId);
    const isFav = favMeals.some(meal => meal.id === mealId);
    const dispatch = useDispatch();
    const toggleFavoriteHandler = () => {
        dispatch(toggleFavorite(mealId));
    };
    useEffect(() => {
        props.navigation.setOptions({
            title: selectedMeal.title,
            headerRight: () =>
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Favorite'
                        iconName={isFav ? 'ios-star' : 'ios-star-outline'}
                        onPress={() => {
                            toggleFavoriteHandler();
                            // setIsFav(!isFav);
                        }} />
                </HeaderButtons>
        });
    }, [isFav]);


    return (
        <ScrollView>
            <Image
                source={{ uri: selectedMeal.imageUrl }}
                style={styles.image}
            />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient =>
                <ListItem key={ingredient}>{ingredient}</ListItem>)
            }
            <Text style={styles.title}>steps</Text>
            {selectedMeal.steps.map(step =>
                <ListItem key={step}>{step}</ListItem>)
            }
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;