import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';

import ImageViewer from './ImageViewer';
import ImageOverlay from './ImageOverlay';

const SCREEN_WIDTH = Dimensions.get('window').width;

// touchablewithoutfeedback wrapper
const TouchableWithoutFeedbackForCompositeComponents = ({onPress, children}) =>
    <TouchableWithoutFeedback onPress={onPress}>
        <View>
            {children}
        </View>
    </TouchableWithoutFeedback>

// Presentation component
const Item = ({ image, onPress }) => {
    return (
        <View style={styles.slideStyle}>
            <TouchableWithoutFeedbackForCompositeComponents onPress={onPress}>
                <ImageViewer.Image
                    style={styles.thumbnailStyle}
                    image={image}
                />
            </TouchableWithoutFeedbackForCompositeComponents>
        </View>
    );
};

class ImageGallery extends Component {
    scrollX = new Animated.Value(0);
    
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
                renderOverlay={({image, onClose }) => <ImageOverlay image={image} onClose={onClose} />}
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
                                    onPress={() => {onImageOpen(this.props.images, image)}}
                                />
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