import React, { Component } from 'react';
import { View, ScrollView, Image, Dimensions, Animated } from 'react-native';
import Lightbox from 'react-native-lightbox';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ImageViewer extends Component {
    scrollX = new Animated.Value(0);
    
    renderImages(images) {
        return images.map((image) => {
            return (
                <Lightbox
                    key={image}
                >
                    <ScrollView
                        minimumZoomScale={1}
                        maximumZoomScale={2}
                        centerContent={true}
                    >
                        <Image
                            style={styles.thumbnailStyle}
                            source={{ uri: image }}
                        />
                    </ScrollView>
                </Lightbox>
            )
        });
    }
    
    renderDots(images) {
        let position = Animated.divide(this.scrollX, SCREEN_WIDTH);
        
        return images.map((slide, index) => {
            let opacity = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
            });
            return (
                <Animated.View
                    key={index}
                    style={[styles.dotStyle, { opacity }]}
                />
            )
        });
    }
    
    render() {
        return (
            <View>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event (
                        [{ nativeEvent: { contentOffset: { x: this.scrollX }}}]
                    )}
                    scrollEventThrottle={16}
                >
                    { this.renderImages(this.props.images) }
                </ScrollView>
                <View style={styles.dotsStyle}>
                    { this.renderDots(this.props.images) }
                </View>
            </View>
        );
    }
}

const styles = {
    thumbnailStyle: {
        height: 200,
        width: SCREEN_WIDTH - 20,
        resizeMode: 'contain'
    },
    dotsStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    dotStyle: {
        height: 8,
        width: 8,
        backgroundColor: '#595959',
        margin: 5,
        borderRadius: 5
    }
};

export default ImageViewer;