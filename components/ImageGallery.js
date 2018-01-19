import React, { Component } from 'react';
import { Image, View, FlatList, ScrollView, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';

import ImageViewer from './ImageViewer';
import ImageOverlay from './ImageOverlay';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// touchablewithoutfeedback wrapper
const TouchableWithoutFeedbackForCompositeComponents = ({onPress, children}) =>
    <TouchableWithoutFeedback onPress={onPress}>
        <View>
            {children}
        </View>
    </TouchableWithoutFeedback>

// Presentation component
const Item = ({ item, images, onImageOpen }) => {
    return (
        <View style={styles.slideStyle}>
            <TouchableWithoutFeedbackForCompositeComponents onPress={() => onImageOpen(images, item.key)}>
                <ImageViewer.Image
                    style={styles.thumbnailStyle}
                    image={item}
                />
            </TouchableWithoutFeedbackForCompositeComponents>
        </View>
    );
};

class ImageGallery extends Component {
    scrollX = new Animated.Value(0);
    
    state = {
        images: []
    };
    
    componentWillMount() {
        this.props.images.map(image => {//
            Image.getSize(image, (width, height) => {
                this.setState({
                    images: [
                        ...this.state.images,
                        {
                            key: image,
                            source: { uri: image },
                            width,
                            height
                        }
                    ]
                });
            });
        });
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.images !== this.props.images) {
            this.setState({images: []});
        }
        if (prevProps.images === this.props.images && this.state.images.length === 0) {
            this.props.images.map(image => {
                Image.getSize(image, (width, height) => {
                    this.setState({
                        images: [
                            ...this.state.images,
                            {
                                key: image,
                                source: { uri: image },
                                width,
                                height
                            }
                        ]
                    });
                });
            });
        }
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
    
    _scrollToClosingIndex = (index) => {
        this.outerScrollViewRef.scrollToIndex({ animated: false, index });
    };
    
    render() {
        return (
            <ImageViewer
                renderOverlay={({ image, onClose }) => <ImageOverlay image={image} onClose={onClose} />}
                renderContent={({onImageOpen}) =>
                    <View>
                        <FlatList
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event(
                                [{nativeEvent: {contentOffset: {x: this.scrollX}}}]
                            )}
                            scrollEventThrottle={16}
                            ref={(ref) => { this.outerScrollViewRef = ref; }}
                            data={this.state.images}
                            renderItem={({item}) => {
                                return (
                                    <Item
                                        key={item.key}
                                        item={item}
                                        images={this.state.images}
                                        onImageOpen={onImageOpen}
                                    />
                                )
                            }}
                        />
                        {this.state.images && this.state.images.length > 1 &&
                            <View style={styles.dotsStyle}>
                                {this.renderDots(this.state.images)}
                            </View>
                        }
                    </View>
                }
                scrollToClosingIndex={this._scrollToClosingIndex}
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
        height: SCREEN_HEIGHT < 600 ? 100 : 200,
        width: SCREEN_HEIGHT < 600 ? 150 : 300
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