import React, { Component } from 'react';
import { Animated, Image, StyleSheet, FlatList, Text, Dimensions, TouchableOpacity } from 'react-native';

import ImagePane from './ImagePane';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class ImageInnerViewer extends Component {
    state = {
        width: new Animated.Value(SCREEN_WIDTH),
        height: new Animated.Value(SCREEN_HEIGHT),
        overlayOpacity: new Animated.Value(this.props.isOverlayOpen ? 1 : 0),
        openProgress: new Animated.Value(0),
        srcImageMeasurements: null,
        destImageMeasurements: null,
        canScrollHorizontal: true
    };
    
    componentDidMount() {
        const {setOpacity, measurer} = this.props.getSourceContext(this.props.imageKey);
        setOpacity(
            this.state.openProgress.interpolate({
                inputRange: [0.005, 0.01, 0.99, 1],
                outputRange: [1, 0, 0, 1]
            })
        );
        
        const srcMeasured = measurer().then((measurements) => {
            this.setState({
                srcImageMeasurements: measurements
            });
        });
    }
    
    onShowOverlay = () => {
        this.props.setOverlay(true);
    };
    
    onHideOverlay = () => {
        this.props.setOverlay(false);
    };
    
    onToggleOverlay = () => {
        this.props.setOverlay(!this.props.isOverlayOpen);
    };
    
    _onZoomStart = () => {
        this.setState({ canScrollHorizontal: false })
    };
    
    _onZoomEnd = () => {
        this.setState({ canScrollHorizontal: true })
    };
    
    handleViewableItemsChanged = ({ viewableItems }) => {
        const item = viewableItems[0];
        const {openProgress, imageKey, onImageChange} = this.props;
        if (!openProgress && item && item.key !== imageKey ) {
            onImageChange(item.key);
        }
    };
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isOverlayOpen !== this.props.isOverlayOpen) {
            Animated.timing(this.state.overlayOpacity, {
                toValue: this.props.isOverlayOpen ? 1 : 0
            }).start()
        }
        
        if (!(prevState.srcImageMeasurements && prevState.destImageMeasurements) &&
            this.state.srcImageMeasurements &&
            this.state.destImageMeasurements) {
            Animated.timing(this.state.openProgress, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }).start(() => {
                this.setState({
                    openProgress: null
                })
            });
        }
    }
    
    render() {
        const {onClose, images, imageKey, topOffset, onImageChange, renderOverlay, setOverlay, isOverlayOpen} = this.props;
        const {width, height, overlayOpacity, openProgress, srcImageMeasurements, destImageMeasurements, canScrollHorizontal} = this.state;
        const initialIndex = images.findIndex(image => image.key === imageKey);
        const image = images.find(im => im.key === imageKey);
    
        let overlay = (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
        );
    
        if (renderOverlay) {
            overlay = renderOverlay({ image, onClose });
        }
        
        let openingInitScale = 0;
        let openingInitTranslateX = 0;
        let openingInitTranslateY = 0;
        if (srcImageMeasurements && destImageMeasurements) {
            const aspectRatio = image.width / image.height;
            const screenAspectRatio = width.__getValue() / height.__getValue();
            
            if (aspectRatio - screenAspectRatio > 0) {
                const maxDim = destImageMeasurements.width;
                const srcShortDim = srcImageMeasurements.height;
                const srcMaxDim = srcShortDim * aspectRatio;
                openingInitScale = srcMaxDim / maxDim;
            } else {
                const maxDim = destImageMeasurements.height;
                const srcShortDim = srcImageMeasurements.width;
                const srcMaxDim = srcShortDim / aspectRatio;
                openingInitScale = srcMaxDim / maxDim;
            }
    
            const translateInitY = srcImageMeasurements.y + (srcImageMeasurements.height / 2);
            const translateDestY = destImageMeasurements.y + (destImageMeasurements.height / 2);
            openingInitTranslateY = translateInitY - translateDestY;
    
            const translateInitX = srcImageMeasurements.x + (srcImageMeasurements.width / 2);
            const translateDestX = destImageMeasurements.x + (destImageMeasurements.width / 2);
            openingInitTranslateX = translateInitX - translateDestX;
        }
        
        return (
            <Animated.View
                style={[styles.outerViewer, { top: -topOffset }]}
                onLayout={Animated.event([
                    {
                        nativeEvent: {
                            layout: { width, height }
                        }
                    }
                ], {
                    listener: e => {
                        // if (this.flatList && initialIndex != null) {
                        //     this.flatList.scrollToIndex({
                        //         index: initialIndex,
                        //         viewPosition: 0
                        //     });
                        // }
                    }
                })}
            >
                <Animated.View
                    style={[styles.viewer, { opacity: openProgress }]}
                >
                    <FlatList
                        scrollEnabled={!openProgress && canScrollHorizontal}
                        ref={fl => { this.flatList = fl; }}
                        style={styles.innerImageGallery}
                        horizontal={true}
                        initialNumToRender={1}
                        pagingEnabled={true}
                        data={images}
                        // onViewableItemsChanged={this.handleViewableItemsChanged}
                        renderItem={({ item }) => {
                            return (
                                <ImagePane
                                    onImageLayout={imageMeasurements => {
                                        if (item === image && !destImageMeasurements) {
                                            this.setState({ destImageMeasurements: imageMeasurements});
                                        }
                                    }}
                                    onZoomEnd={this._onZoomEnd}
                                    onZoomStart={this._onZoomStart}
                                    openProgress={openProgress}
                                    onToggleOverlay={this.onToggleOverlay}
                                    onShowOverlay={this.onShowOverlay}
                                    onHideOverlay={this.onHideOverlay}
                                    image={item}
                                    width={width}
                                    height={height}
                                />
                            );
                        }}
                        getItemLayout={(data, index) => ({
                            // gets size of each of the cells
                            length: width.__getValue(),
                            index,
                            offset: index * width.__getValue()
                        })}
                        initialScrollIndex={initialIndex}
                        keyExtractor={(item, index) => index}
                    />
                    <Animated.View
                        pointerEvents={ isOverlayOpen ? 'box-none' : 'none' }
                        style={[{opacity: overlayOpacity}, StyleSheet.absoluteFill]}
                    >
                        {overlay}
                    </Animated.View>
                </Animated.View>
                {srcImageMeasurements && destImageMeasurements && openProgress &&
                    <Animated.Image
                        source={image.source}
                        style={{
                            opacity: openProgress.interpolate({
                                inputRange: [0, 0.005, 0.995, 1],
                                outputRange: [0, 1, 1, 0]
                            }),
                            position: 'absolute',
                            width: destImageMeasurements.width,
                            height: destImageMeasurements.height,
                            left: destImageMeasurements.x,
                            top: destImageMeasurements.y,
                            transform: [
                                {
                                    translateX: openProgress.interpolate({
                                        inputRange: [0.01, 0.99],
                                        outputRange: [openingInitTranslateX, 0]
                                    })
                                },
                                {
                                    translateY: openProgress.interpolate({
                                        inputRange: [0.01, 0.99],
                                        outputRange: [openingInitTranslateY, 0]
                                    })
                                },
                                {
                                    scale: openProgress.interpolate({
                                        inputRange: [0.01, 0.99],
                                        outputRange: [openingInitScale, 1]
                                    })
                                }
                            ]
                        }}
                    />
                }
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
    innerImageGallery: {
        flex: 1
    },
    outerViewer: {
        position: 'relative',
        left: 0,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
    }
};

export default ImageInnerViewer;