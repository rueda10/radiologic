import React, { Component } from 'react';
import { View, ScrollView, Image, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';

import ImageViewer from './ImageViewer';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Item = ({ image, onPress }) => {
    return (
        <View
            style={styles.slideStyle}
        >
            <TouchableWithoutFeedback onPress={onPress}>
                <Image
                    style={styles.thumbnailStyle}
                    source={{uri: image}}
                />
            </TouchableWithoutFeedback>
        </View>
    );
};

class ImageGallery extends Component {
    scrollX = new Animated.Value(0);
    
    componentWillMount() {
        this.props.images.map(image => Image.prefetch(image));
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
            <ImageViewer
                renderContent={({onImageOpen}) =>
                    <View>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event(
                                [{nativeEvent: {contentOffset: {x: this.scrollX}}}]
                            )}
                            scrollEventThrottle={16}
                        >
                            {this.props.images.map(image =>
                                <Item
                                    key={image}
                                    image={image}
                                    onPress={() => {onImageOpen(this.props.images, image)}}/>
                            )}
                        </ScrollView>
                        {this.props.images && this.props.images.length > 1 &&
                            <View style={styles.dotsStyle}>
                                {this.renderDots(this.props.images)}
                            </View>
                        }
                    </View>
                }
            />
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    thumbnailStyle: {
        height: 200,
        width: 300
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

export default ImageGallery;