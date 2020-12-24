import React from 'react';
import { Text, Platform } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FilterScreen from '../screens/FilterScreen';

import Colors from '../constants/Color';

const defaultStackNavOption = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS == 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primaryColor    
    }
}

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        headerTitle: 'Meal Categories'
    },
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS == 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primaryColor    
    }
} , defaultStackNavOption);

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, defaultStackNavOption);

const tabScreenConfig = {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
          );
        },
        tabBarColor: Colors.primaryColor,
        tabBarLabel: Platform.OS == 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
      }
    },
    Favorites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
        },
        tabBarColor: Colors.accentColor,
        tabBarLabel: Platform.OS == 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorite</Text> : 'Favorite'
      }
    }
  };
  
const MealsFavTabNavigator = Platform.OS == 'android' ? 
    createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: false,
        barStyle: {
            backgroundColor: Colors.primaryColor,
        }
    }) 
    : createBottomTabNavigator(
        tabScreenConfig, {
      tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans'
          },
        activeTintColor: Colors.accentColor
      }
    }
  );

const FiltersNavigator = createStackNavigator({
    Filters: FilterScreen
}, {
    defaultNavigationOptions: defaultStackNavOption
})

const MainNavigator = createDrawerNavigator({
    MealsFav: { screen: MealsFavTabNavigator, navigationOptions: {
        drawerLabel: 'Meals'
    }},
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});
  
export default createAppContainer(MainNavigator); 

