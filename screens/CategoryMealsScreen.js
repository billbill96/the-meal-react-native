import React from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Color';

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id == catId);
    return (
        <View style={styles.screen}>
            <Text>The Category Meals Screen</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to Deatil" onPress={() => {
                props.navigation.push('MealDetail');
            }} />
            <Button title="Go back" onPress={() => {
                props.navigation.pop();
            }} />
        </View>
    )
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id == catId);
    return {
        headerTitle: selectedCategory.title
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;