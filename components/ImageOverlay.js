import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

class ImageOverlay extends Component {
    // Overlay specific to our use case
    render() {
        const { image, onClose } = this.props;
        
        return (
            <View
                pointerEvents='box-none'
                style={[ StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]}
            >
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    closeText: {
        color: 'white',
        backgroundColor: 'transparent'
    },
    closeButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 40,
        left: 20,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        padding: 20,
        zIndex: 2
    }
};

export default ImageOverlay;