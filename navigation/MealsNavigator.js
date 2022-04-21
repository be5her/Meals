import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import MyHeaderButtom from '../components/HeaderButton';

import Colors from '../constants/Colors';

// import { CATEGORIES, MEALS } from '../data/dummy-data';

const Stack = createStackNavigator();
const CatFavTab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: Colors.accentColor,
                drawerLabelStyle: {
                    fontFamily: 'open-sans-bold'
                }
            }}>
            <Drawer.Screen
                name="MealsFavs"
                component={MealsFavTabNavigator}
                options={{ drawerLabel: "Meals" }} />
            <Drawer.Screen
                name="FiltersStack"
                component={FiltersNavigator}
                options={{ drawerLabel: "Filters" }} />
        </Drawer.Navigator>
    );
};

const MealsFavTabNavigator = () => {
    return (
        <GenericTabNavigator>
            <CatFavTab.Screen
                name="Meals"
                component={MealsNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.color} />
                    },
                    tabBarColor: Colors.primaryColor,
                    title: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text> : "Meals",

                }} />
            <CatFavTab.Screen
                name="FavoritesStack"
                component={FavoritesNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name='ios-star' size={25} color={tabInfo.color} />
                    },
                    tabBarColor: Colors.accentColor,
                    title: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text> : "Favorites",

                }} />
        </GenericTabNavigator>
    );
};

const MealsNavigator = (props) => {
    return (
        <Stack.Navigator screenOptions={defaultNavigationOptions}>
            <Stack.Screen name="Categories" component={CategoriesScreen}
                options={{
                    headerLeft: MenuButton.bind(this, props),
                }} />
            <Stack.Screen name="CategoryMeals" component={CategoryMealsScreen} />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
        </Stack.Navigator>
    );
}

const FavoritesNavigator = (props) => {
    return (
        <Stack.Navigator screenOptions={defaultNavigationOptions}>
            <Stack.Screen name="Favorites" component={FavoritesScreen}
                options={{
                    headerLeft: MenuButton.bind(this, props),
                }} />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
        </Stack.Navigator>);
};

const FiltersNavigator = (props) => {
    return (
        <Stack.Navigator screenOptions={defaultNavigationOptions}
        >
            <Stack.Screen name="Filters" component={FiltersScreen}
                options={{
                    headerLeft: MenuButton.bind(this, props),
                    headerRight: () =>
                        <HeaderButtons
                            HeaderButtonComponent={
                                MyHeaderButtom
                            }>
                            <Item
                                title='Save'
                                iconName='ios-save'
                                onPress={() => { console.log(props.save) }} />
                        </HeaderButtons>

                }} />
        </Stack.Navigator>);
};




const GenericTabNavigator = (props) => {
    if (Platform.OS === 'android') {
        return (
            <CatFavTab.Navigator screenOptions={defaultNavigationOptions} {...materialTabProps}>
                {props.children}
            </CatFavTab.Navigator>
        );
    } else {
        <CatFavTab.Navigator screenOptions={bottomTab}>
            {props.children}
        </CatFavTab.Navigator>
    }
}

const MenuButton = (props) => {
    return (
        <HeaderButtons
            HeaderButtonComponent={
                MyHeaderButtom
            }>
            <Item
                title='Menu'
                iconName='ios-menu'
                onPress={() => { props.navigation.openDrawer() }} />
        </HeaderButtons>
    )
};


export default function App() {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    );
}

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,

};

const tabNavigatorOptions = {
    tabBarActiveTintColor: Colors.accentColor,
};

const materialTabProps = {
    activeColor: 'white',
    shifting: true,
    barStyle: { backgroundColor: '#694fad' },
    tabBarLabel: {
        fontFamily: 'open-sans-bold'
    }
};

const bottomTab = {
    ...{ defaultNavigationOptions },
    ...{ tabNavigatorOptions }
}