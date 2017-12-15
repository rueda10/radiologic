import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import { getQuestions } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class WelcomeScreen extends Component {
    componentWillMount() {
        this.props.getQuestions();
    }
    
    render() {
        if (this.props.questions) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={[styles.slideStyle, {backgroundColor: 'white'}]}>
                        <Button
                            raised
                            large
                            title="BEGIN / INICIAR"
                            backgroundColor='#01579b'
                            color='white'
                            fontWeight='bold'
                            onPress={() => this.props.navigation.navigate('main')}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <Text style={styles.textStyle}>Nothing to see</Text>
            )
        }
    }
}

const styles = {
    textStyle: {
        color: '#abc',
        fontSize: 25
    },
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH - 60,
        marginLeft: 30,
        marginRight: 30
    },
};

function mapStateToProps({ questions }) {
    return {
        questions
    };
}

export default connect(mapStateToProps, { getQuestions })(WelcomeScreen);