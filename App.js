import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';

import QuestionScreen from './screens/QuestionScreen';
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends React.Component {
    render() {
        const MainNavigator = TabNavigator({
            welcome: { screen: WelcomeScreen },
            main: {
                screen: TabNavigator({
                    question: {
                        screen: StackNavigator({
                            questions: {
                                screen: QuestionScreen
                            }
                        }, {
                            headerMode: 'none'
                        })
                    }
                }, {
                    navigationOptions: {
                        tabBarVisible: false
                    },
                    lazy: true
                })
            }
        }, {
            navigationOptions: {
                tabBarVisible: false
            },
            lazy: true
        });
        
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar barStyle='light-content' />
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
