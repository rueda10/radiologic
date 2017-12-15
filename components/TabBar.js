import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { setCurrent } from '../actions';

class TabBar extends Component {
    
    tabIconPressed(name) {
        if (name === 'home') {
            this.props.setCurrent({});
            this.setState({ currentRoot: null });
        } else if (name === 'search') {
        
        }
    }
    
    render() {
        return (
            <View style={styles.tabBarStyle}>
                <Icon
                    name='home'
                    size={30}
                    color='white'
                    underlayColor='#01579b'
                    onPress={() => this.tabIconPressed('home')}
                />
            </View>
        );
    }
}

const styles = {
    tabBarStyle: {
        flex: 2,
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 64,
        backgroundColor: '#01579b',
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#4f83cc',
        borderTopWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    }
};

export default connect(null, { setCurrent })(TabBar);