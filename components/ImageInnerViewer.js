import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, FlatList, Text, Dimensions, TouchableOpacity } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ImagePane = ({ image, width, height, onToggleOverlay }) => {
    return (
        <TouchableWithoutFeedback onPress={onToggleOverlay}>
            <Animated.View style={[styles.innerPane, {width: width, height: height}]}>
                <Animated.Image
                    style={{width: width, height: height}}
                    source={{uri: image, cache: 'force-cache'}}
                    resizeMode='contain'
                />
            </Animated.View>
        </TouchableWithoutFeedback>
    )
};

class ImageInnerViewer extends Component {
    state = {
        width: new Animated.Value(SCREEN_WIDTH),
        height: new Animated.Value(SCREEN_HEIGHT),
        overlayOpacity: new Animated.Value(this.props.isOverlayOpen ? 1 : 0)
    };
    
    onToggleOverlay = () => {
        this.props.setOverlay(!this.props.isOverlayOpen)
    };
    
    componentDidUpdate(prevProps) {
        if (prevProps.isOverlayOpen != this.props.isOverlayOpen) {
            Animated.timing(this.state.overlayOpacity, {
                toValue: this.props.isOverlayOpen ? 1 : 0
            }).start()
        }
    }
    
    render() {
        const {onClose, images, currentImage, topOffset, onImageChange, renderOverlay} = this.props;
        const initialIndex = images.findIndex(image => image === currentImage);
        const {width, height, overlayOpacity} = this.state;
        let overlay = (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
        );
        
        if (renderOverlay) {
            overlay = renderOverlay({ image: currentImage, onClose });
        }
        
        return (
            <Animated.View
                style={[styles.viewer, { top: -topOffset }]}
                onLayout={Animated.event([
                    {
                        nativeEvent: {
                            layout: { width, height }
                        }
                    }
                ], {
                    listener: (e) => {
                        if (this.flatList && initialIndex != null) {
                            this.flatList.scrollToIndex({
                                index: initialIndex,
                                viewPosition: 0
                            });
                        }
                    }
                })}
            >
                <FlatList
                    ref={fl => { this.flatList = fl; }}
                    style={styles.innerImageGallery}
                    horizontal={true}
                    initialNumToRender={1}
                    pagingEnabled={true}
                    data={images}
                    // onViewableItemsChanged={({viewableItems}) => {
                    //     const item = viewableItems[0];
                    //     if (item && item.item !== currentImage ) {
                    //         onImageChange(item.item);
                    //     }
                    // }}
                    renderItem={({item}) => <ImagePane image={item} width={width} height={height} onToggleOverlay={this.onToggleOverlay} />}
                    getItemLayout={(data, index) => ({
                        length: width.__getValue(),
                        index,
                        offset: index * width.__getValue()
                    })}
                    initialScrollIndex={initialIndex}
                    keyExtractor={(item, index) => index}
                />
                <Animated.View
                    pointerEvents='box-none'
                    style={[{opacity: overlayOpacity}, StyleSheet.absoluteFill]}
                >
                    {overlay}
                </Animated.View>
            </Animated.View>
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerImageGallery: {
        flex: 1
    }
};

export default ImageInnerViewer;