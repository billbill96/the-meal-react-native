import { MEALS } from '../../data/dummy-data';

const initalState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoritedMeals: []
};

const mealsReducer = (state = initalState, action) => {
    return state;
}

export default mealsReducer;