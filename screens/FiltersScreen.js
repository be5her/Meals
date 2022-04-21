import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import MyHeaderButtom from '../components/HeaderButton';

import { setFilters } from '../store/actions/mealsActions';

import Colors from '../constants/Colors';
import { cond } from 'react-native-reanimated';

const FilterSweitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.lightPrimaryColor, false: '#aaa' }}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.state}
                onValueChange={props.onChange}
                onChange={props.saveFilters}
            />
        </View>
    );
}

const FiltersScreen = props => {
    const { navigation } = props;
    navigation.closeDrawer();
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliediedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliediedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => { saveFilters() });
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons
                    HeaderButtonComponent={
                        MyHeaderButtom
                    }>
                    <Item
                        title='Save'
                        iconName='ios-save'
                        onPress={saveFilters} />
                </HeaderButtons>
            ),
        });
    }, [saveFilters, navigation]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>
                Available Filters
            </Text>
            <FilterSweitch
                label='Gluten Free'
                state={isGlutenFree}
                onChange={newValue => { setIsGlutenFree(newValue); }}
            />
            <FilterSweitch
                label='Lactose Free'
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSweitch
                label='Vegan'
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSweitch
                label='Vegetarian'
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
});

export default FiltersScreen;