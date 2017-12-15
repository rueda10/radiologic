import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, multiline }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                multiline={multiline}
                numberOfLines={4}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                blurOnSubmit
            />
        </View>
    );
}

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height: 30,
        flex: 2,
        borderColor: '#D9DFDF',
        borderWidth: 1,
        marginLeft: 10
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 5,
        flex: 1
    },
    containerStyle: {
        height: 30,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export { Input };