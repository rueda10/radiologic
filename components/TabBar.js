import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import ActionSheet from 'react-native-actionsheet';

import { setCurrent, setLanguage } from '../actions';

// SCREEN AND ELEMENT SIZES
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const ICON_SIZE = 30;
const iconMargin = (SCREEN_WIDTH / 2 - ICON_SIZE) / 2;
const iconPadding = SCREEN_HEIGHT === 812 ? 25 : 0;
const TAB_BAR_HEIGHT = SCREEN_HEIGHT === 812 ? 84 : 64;

// ACTIONSHEET INDEX
const CANCEL_INDEX = 2;

class TabBar extends Component {
    
    tabIconPressed(name) {
        if (name === 'home') {
            this.props.setCurrent({});
            this.setState({ currentRoot: null });
        } else if (name === 'language') {
            this.ActionSheet.show();
        }
    }
    
    setLanguage(index) {
        if (CANCEL_INDEX !== index) {
            this.props.setLanguage(index);
        }
    };
    
    render() {
        return (
            <View style={styles.tabBarStyle}>
                <Icon
                    iconStyle={styles.iconStyle}
                    name='home'
                    size={ICON_SIZE}
                    color='white'
                    underlayColor='#01579b'
                    onPress={() => this.tabIconPressed('home')}
                />
                <Icon
                    iconStyle={styles.iconStyle}
                    name='language'
                    type='font-awesome'
                    size={ICON_SIZE}
                    color='white'
                    underlayColor='#01579b'
                    onPress={() => this.tabIconPressed('language')}
                />
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['English', 'Español', 'Cancel']}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={(index) => this.setLanguage(index)}
                />
            </View>
        );
    }
}

const styles = {
    tabBarStyle: {
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        height: TAB_BAR_HEIGHT,
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
        zIndex: 0
    },
    iconStyle: {
        marginLeft: iconMargin,
        marginRight: iconMargin,
        paddingBottom: iconPadding
    }
};

function mapStateToProps({ current }) {
    return {
        current
    };
}

export default connect(mapStateToProps, { setCurrent, setLanguage })(TabBar);