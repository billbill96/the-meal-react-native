import React, { useState, useEffect, useCallback } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Color';
import { setFilters } from '../store/actions/meal';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch
            trackColor={{true: Colors.primaryColor}}
            thumbColor={Platform.OS == 'android' ?Colors.primaryColor : ''} 
            value={props.state} 
            onValueChange={props.onChange}/>
    </View>
    );
};

const FilterScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback( () => {
        const appliedFilter = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilter));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect( () => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Avaliable Filters/ Restrictions</Text>
            <FilterSwitch 
                label='Gluten-Free' 
                state={isGlutenFree} 
                onChange={newValue => setIsGlutenFree(newValue)}/>
            <FilterSwitch 
                label='Lacose-Frtee' 
                state={isLactoseFree} 
                onChange={newValue => setIsLactoseFree(newValue)}/>
            <FilterSwitch 
                label='Vegan' 
                state={isVegan} 
                onChange={newValue => setIsVegan(newValue)}/>
            <FilterSwitch 
                label='Vegetarian' 
                state={isVegetarian} 
                onChange={newValue => setIsVegetarian(newValue)}/>
        </View>
    )
};

FilterScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>),
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Save" iconName='ios-save' onPress={
                navData.navigation.getParam('save')
            }/>
        </HeaderButtons>)
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    },
    title: {
        fontFamily: 'open-sans',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
});

export default FilterScreen;