import React, { Component } from 'react';
import { View, FlatList, Text, Image, Dimensions, TouchableOpacity } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const TOP_OFFSET = SCREEN_HEIGHT === 812 ? -430 : -407;

const ImagePane = ({ image }) => {
    return (
        <View style={styles.innerPane}>
            <Image
                style={{width: 300, height: 200}}
                source={{uri: image}}
            />
        </View>
    )
};

class ImageInnerViewer extends Component {
    render() {
        const {onClose, images, currentImage, topOffset} = this.props;
        const initialIndex = images.map(image => image).indexOf(currentImage);
        
        return (
            <View style={[styles.viewer, { top: -topOffset }]}>
                <FlatList
                    style={styles.innerImageGallery}
                    horizontal={true}
                    initialNumToRender={1}
                    pagingEnabled={true}
                    data={images}
                    renderItem={({item}) => <ImagePane image={item}/>}
                    getItemLayout={(data, index) => ({
                        length: SCREEN_WIDTH,
                        index,
                        offset: index * SCREEN_WIDTH
                    })}
                    initialScrollIndex={initialIndex}
                    keyExtractor={(item, index) => index}
                />
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    closeText: {
        color: 'white'
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        padding: 20,
        zIndex: 2
    },
    closeButtonWrapper: {
        flex: 1
    },
    viewer: {
        position: 'relative',
        left: 0,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: 'black',
        zIndex: 1
    },
    innerPane: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerImageGallery: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    }
};

export default ImageInnerViewer;