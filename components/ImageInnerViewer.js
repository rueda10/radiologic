import React, { Component } from 'react';
import { Animated, StyleSheet, FlatList, Text, Dimensions, TouchableOpacity } from 'react-native';

import ImagePane from './ImagePane';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class ImageInnerViewer extends Component {
    state = {
        width: new Animated.Value(SCREEN_WIDTH),
        height: new Animated.Value(SCREEN_HEIGHT),
        overlayOpacity: new Animated.Value(this.props.isOverlayOpen ? 1 : 0),
        openProgress: new Animated.Value(0),
        dismissProgress: new Animated.Value(SCREEN_HEIGHT),
        srcImageMeasurements: null,
        destImageMeasurements: null,
        canScrollHorizontal: true,
        isFirstPass: true
    };
    
    _isOverlayVisible = this.props.isOverlayOpen;
    
    componentDidMount() {
        const {setOpacity, measurer} = this.props.getSourceContext(this.props.imageKey);
        
        setOpacity(
            this.state.openProgress.interpolate({
                inputRange: [0.005, 0.01, 0.99, 1],
                outputRange: [1, 0, 0, 1]
            })
        );
        
        const { images, imageKey } = this.props;
        const width = this.state.width.__getValue();
        const height = this.state.height.__getValue();
        const image = images.find(im => im.key === imageKey);
    
        const aspectRatio = image.width / image.height;
        const screenAspectRatio = width / height;
        
        // black bars on top and bottom
        let destWidth = width;
        let destHeight = width / aspectRatio;
        let destX = 0;
        let destY = height / 2 - destHeight / 2;
    
        if (aspectRatio - screenAspectRatio < 0) {
            // black bars on left and right
            destHeight = height;
            destWidth = height * aspectRatio;
            destY = 0;
            destX = width / 2 - destWidth / 2;
        }
        
        // This sets our source image measurements
        const srcMeasured = measurer().then(measurements => {
            this.setState({
                srcImageMeasurements: measurements,
                destImageMeasurements: {
                    width: destWidth,
                    height: destHeight,
                    x: destX,
                    y: destY
                }
            }, () => {
                this.setState({ isFirstPass: false })
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
    
    _animateOverlayOpacity = (isVisible) => {
        Animated.timing(this.state.overlayOpacity, {
            toValue: isVisible ? 1 : 0,
            useNativeDriver: true,
            duration: 500
        }).start();
        this._isOverlayVisible = isVisible;
    };
    
    componentDidUpdate(prevProps, prevState) {
        const { isOverlayOpen } = this.props;
        
        if (prevProps.isOverlayOpen !== this.props.isOverlayOpen) {
            this._animateOverlayOpacity(isOverlayOpen);
        }
        
        if (!(prevState.srcImageMeasurements && prevState.destImageMeasurements) &&
            this.state.srcImageMeasurements &&
            this.state.destImageMeasurements) {
            Animated.timing(this.state.openProgress, {
                toValue: 1,
                duration: 450,
                useNativeDriver: true
            }).start(() => {
                this.onShowOverlay();
                this.setState({
                    openProgress: null
                })
            });
        }
    }
    
    render() {
        const { onClose, images, imageKey, topOffset, onImageChange, renderOverlay, isOverlayOpen } = this.props;
        const { width, height, overlayOpacity, openProgress, dismissProgress, srcImageMeasurements, destImageMeasurements, isFirstPass } = this.state;
        
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
        
        const outerViewerOpacity = openProgress || 1;
        const innerViewerOpacity = dismissProgress.interpolate({
            inputRange: [0, height.__getValue(), height.__getValue() * 2],
            outputRange: [0, 1, 0]
        });
        
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
                { !isFirstPass &&
                    <Animated.View
                        style={[styles.viewer, { opacity: outerViewerOpacity }]}
                    >
                        <Animated.View
                            style={[StyleSheet.absoluteFill, { backgroundColor: 'black', opacity: innerViewerOpacity}]}
                        />
                        {this._renderFlatList()}
                        <Animated.View
                            pointerEvents={ isOverlayOpen ? 'box-none' : 'none' }
                            style={[{opacity: overlayOpacity}, StyleSheet.absoluteFill]}
                        >
                            {overlay}
                        </Animated.View>
                    </Animated.View>
                }
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
    
    _renderFlatList() {
        const { images, imageKey } = this.props;
        const { width, height, openProgress, dismissProgress, canScrollHorizontal } = this.state;
    
        const initialIndex = images.findIndex(image => image.key === imageKey);
        
        return (
            <Animated.ScrollView
                pagingEnabled={true}
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { y: dismissProgress }
                            }
                        }
                    ],
                    {
                        userNativeDriver: true,
                        listener: e => {
                            const yOffset = e.nativeEvent.contentOffset.y;
                            const heightValue = height.__getValue();
                            
                            if (yOffset <= 0 || yOffset >= 2 * heightValue) {
                                this.props.onClose();
                            }
                            
                            if (yOffset === heightValue) {
                                if (!this._isOverlayVisible && this.props.isOverlayOpen) {
                                    this._animateOverlayOpacity(true);
                                }
                            } else if (this._isOverlayVisible) {
                                this._animateOverlayOpacity(false);
                            }
                        }
                    }
                )}
                contentOffset={{ x: 0, y: height.__getValue() }}
            >
                <Animated.View style={{ width, height }}/>
                <FlatList
                    scrollEnabled={!openProgress && canScrollHorizontal && images.length !== 1}
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
                <Animated.View style={{ width, height }}/>
            </Animated.ScrollView>
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
        backgroundColor: 'transparent'
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