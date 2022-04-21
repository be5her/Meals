import { ToggleButton } from 'react-native-paper';
import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS, UPDATE_STATE } from '../actions/mealsActions';

storeData = null;
const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
};


const mealsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_FILTERS:
            const filters = action.filters
            const newFilteredMeals = state.meals.filter(meal => {
                if (filters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (filters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if (filters.vegan && !meal.isVegan) {
                    return false;
                }
                if (filters.vegetarian && !meal.isVegetarian) {
                    return false;
                }
                return true;
            });
            return { ...state, filteredMeals: newFilteredMeals }

        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeals: updatedFavMeals }
            } else {
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) }
            }

        default:
            return state;

    }
};


export default mealsReducer;