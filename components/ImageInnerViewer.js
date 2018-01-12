import React, { Component } from 'react';
import { Animated, StyleSheet, BackHandler, FlatList, Text, Platform, Dimensions, TouchableOpacity } from 'react-native';

import ImagePane from './ImagePane';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ANIM_DURATION = 450;

class ImageInnerViewer extends Component {
    state = {
        width: new Animated.Value(SCREEN_WIDTH),
        height: new Animated.Value(SCREEN_HEIGHT),
        overlayOpacity: new Animated.Value(this.props.isOverlayOpen ? 1 : 0),
        openProgress: new Animated.Value(0),
        dismissProgress: null,
        dismissScrollProgress: new Animated.Value(SCREEN_HEIGHT),
        inlineImageMeasurements: null,
        openImageMeasurements: null,
        canScrollHorizontal: true,
        isFirstPass: true
    };
    
    _isOverlayVisible = this.props.isOverlayOpen;
    
    componentDidMount() {
        const { imageKey } = this.props;
    
        this._setSourceOpacity(this.state.openProgress);
        this._measureImage(imageKey);
        
        BackHandler.addEventListener('hardwareBackPress', this.close);
        
        // const { measurer } = this.props.getSourceContext(this.props.imageKey);
        //
        // this._setSourceOpacity(this.state.openProgress);
        //
        // const openImageMeasurements = this._getDestMeasurements();
        //
        // // This sets our source image measurements
        // measurer().then(measurements => {
        //     this.setState({
        //         inlineImageMeasurements: measurements,
        //         openImageMeasurements
        //     }, () => {
        //         this.setState({ isFirstPass: false })
        //     });
        // });
    }
    
    _measureImage = imageKey => {
        const openImageMeasurements = this._getDestMeasurements(imageKey);
        const { measurer } = this.props.getSourceContext(imageKey);
        
        measurer().then(measurements => {
            this.setState({
                inlineImageMeasurements: measurements,
                openImageMeasurements
            }, () => {
                this.state.isFirstPass && this.setState({ isFirstPass: false })
            });
        });
    };
    
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.close);
        const { setOpacity } = this.props.getSourceContext(this.props.imageKey);
        setOpacity(1);
    }
    
    _setSourceOpacity(progress) {
        const { setOpacity } = this.props.getSourceContext(this.props.imageKey);
    
        setOpacity(
            progress.interpolate({
                inputRange: [0.005, 0.01, 0.99, 1],
                outputRange: [1, 0, 0, 0]
            })
        );
    }
    
    _getDestMeasurements(imageKey) {
        const { images } = this.props;
        const width = this.state.width.__getValue();
        const height = this.state.height.__getValue();
        const image = images.find(im => im.key === imageKey);
    
        const aspectRatio = image.width / image.height;
        const screenAspectRatio = width / height;
    
        // black bars on top and bottom
        let destWidth = width;
        let destHeight = width / aspectRatio;
        // let destX = 0;
        // let destY = height / 2 - destHeight / 2;
    
        if (aspectRatio - screenAspectRatio < 0) {
            // black bars on left and right
            destHeight = height;
            destWidth = height * aspectRatio;
            // destY = 0;
            // destX = width / 2 - destWidth / 2;
        }
        
        const destX = (width - destWidth) / 2;
        const destY = (height - destHeight) / 2;
        
        return {
            width: destWidth,
            height: destHeight,
            x: destX,
            y: destY
        };
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
    
    _animateOverlayOpacity(isVisible) {
        Animated.timing(this.state.overlayOpacity, {
            toValue: isVisible ? 1 : 0,
            useNativeDriver: true,
            duration: 500
        }).start();
        this._isOverlayVisible = isVisible;
    };
    
    componentWillReceiveProps(nextProps) {
        if (this.props.imageKey !== nextProps.imageKey) {
            const lastInlineImageContext = this.props.getSourceContext(this.props.imageKey);
            lastInlineImageContext.setOpacity(1);
            const nextInlineImageContext = this.props.getSourceContext(nextProps.imageKey);
            const { transitionProgress } = this._getTransitionProgress();
            nextInlineImageContext.setOpacity(
                transitionProgress.interpolate({
                    inputRange: [0.005, 0.01, 0.99, 1],
                    outputRange: [1, 0, 0, 0]
                })
            );
            this.setState({
                inlineImageMeasurements: null,
                openImageMeasurements: null
            }, () => {
                this._measureImage(nextProps.imageKey);
            });
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        const { isOverlayOpen } = this.props;
        
        if (prevProps.isOverlayOpen !== isOverlayOpen) {
            this._animateOverlayOpacity(isOverlayOpen);
            this._isOverlayVisible = isOverlayOpen;
        }
        
        if (this.state.openProgress &&
            !(prevState.inlineImageMeasurements && prevState.openImageMeasurements) &&
            this.state.openImageMeasurements &&
            this.state.inlineImageMeasurements) {
            Animated.timing(this.state.openProgress, {
                toValue: 1,
                duration: ANIM_DURATION,
                useNativeDriver: true
            }).start(() => {
                    this.onShowOverlay();
                    this.setState({
                        openProgress: null
                    }, () => {
                        this._setSourceOpacity(
                            this._getTransitionProgress().transitionProgress
                        );
                    });
                }
            );
        }
    }
    
    close = async () => {
        this.onHideOverlay();
        const dismissProgress = new Animated.Value(1);

        this._setSourceOpacity(dismissProgress);
        
        const { imageKey } = this.props;
        
        const openImageMeasurements = this._getDestMeasurements(imageKey);
        const { measurer } = this.props.getSourceContext(imageKey);
        const inlineImageMeasurements = await measurer();
        
        this.setState({
            dismissProgress,
            inlineImageMeasurements,
            openImageMeasurements
        }, () => {
            Animated.timing(dismissProgress, {
                toValue: 0,
                duration: ANIM_DURATION,
                useNativeDriver: true
            }).start(() => {
                this.props.onClose();
            });
        });
    };
    
    render() {
        const { images, imageKey, topOffset, onImageChange, renderOverlay, isOverlayOpen } = this.props;
        const { width, height, overlayOpacity, openProgress, dismissProgress, dismissScrollProgress, inlineImageMeasurements, openImageMeasurements, isFirstPass } = this.state;
        
        const image = images.find(im => im.key === imageKey);
    
        const onClose = this.close;
        
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
        let inlineAspectX = 1;
        let inlineAspectY = 1;
        
        if (inlineImageMeasurements && openImageMeasurements) {
            const aspectRatio = image.width / image.height;
            const screenAspectRatio = width.__getValue() / height.__getValue();
            
            if (aspectRatio - screenAspectRatio > 0) {
                // black bars on top and bottom
                const maxDim = openImageMeasurements.width;
                const srcShortDim = inlineImageMeasurements.height;
                const srcMaxDim = srcShortDim * aspectRatio;
                openingInitScale = srcMaxDim / maxDim;
                inlineAspectX = (inlineImageMeasurements.width / inlineImageMeasurements.height) / aspectRatio;
                inlineAspectY = aspectRatio;
            } else {
                // black bars on left and right
                const maxDim = openImageMeasurements.height;
                const srcShortDim = inlineImageMeasurements.width;
                const srcMaxDim = srcShortDim / aspectRatio;
                openingInitScale = srcMaxDim / maxDim;
                inlineAspectX = 1 / aspectRatio;
                inlineAspectY = aspectRatio * inlineImageMeasurements.height / inlineImageMeasurements.width;
            }
    
            const translateInitY = inlineImageMeasurements.y + (inlineImageMeasurements.height / 2);
            const translateDestY = openImageMeasurements.y + (openImageMeasurements.height / 2);
            openingInitTranslateY = translateInitY - translateDestY;
    
            const translateInitX = inlineImageMeasurements.x + (inlineImageMeasurements.width / 2);
            const translateDestX = openImageMeasurements.x + (openImageMeasurements.width / 2);
            openingInitTranslateX = translateInitX - translateDestX;
        }
        
        // const outerViewerOpacity = openProgress || 1;
        // let innerViewerOpacity = dismissScrollProgress.interpolate({
        //     inputRange: [0, height.__getValue(), height.__getValue() * 2],
        //     outputRange: [0, 1, 0]
        // });
        //
        // if (dismissProgress) {
        //     innerViewerOpacity = dismissProgress;
        // }
        //
        // const openCloseProgress = openProgress || dismissProgress;
    
        const { transitionProgress, innerViewerOpacity, outerViewerOpacity } = this._getTransitionProgress();
        
        const openingTranslateY = transitionProgress.interpolate({
            inputRange: [0.01, 0.99],
            outputRange: [openingInitTranslateY, 0]
        });
    
        const translateY = Animated.add(
            openingTranslateY,
            Animated.multiply(
                dismissScrollProgress.interpolate({
                    inputRange: [0, height.__getValue(), height.__getValue() * 2],
                    outputRange: [300, 0, -300]
                }),
                dismissScrollProgress.interpolate({
                    inputRange: [
                        0,
                        height.__getValue() * 0.5,
                        height.__getValue(),
                        height.__getValue() * 1.5,
                        height.__getValue() * 2
                    ],
                    outputRange: [0, 1, 1, 1, 0]
                })
            )
        );
        
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
                            style={[{ opacity: overlayOpacity }, StyleSheet.absoluteFill]}
                        >
                            {overlay}
                        </Animated.View>
                    </Animated.View>
                }
                {inlineImageMeasurements && openImageMeasurements &&
                    <Animated.View
                        pointerEvents='none'
                        style={{
                            position: 'absolute',
                            width: openImageMeasurements.width,
                            height: openImageMeasurements.height,
                            left: openImageMeasurements.x,
                            top: openImageMeasurements.y,
                            overflow: 'hidden',
                            opacity: transitionProgress.interpolate({
                                inputRange: [0, 0.005, 0.995, 1],
                                outputRange: [0, 1, 1, 0]
                            }),
                            transform: [
                                {
                                    translateX: transitionProgress.interpolate({
                                        inputRange: [0.01, 0.99],
                                        outputRange: [openingInitTranslateX, 0]
                                    })
                                },
                                {
                                    translateY
                                },
                                {
                                    scale: transitionProgress.interpolate({
                                        inputRange: [0.01, 0.99],
                                        outputRange: [openingInitScale, 1]
                                    })
                                },
                                {
                                    scaleX: transitionProgress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [inlineAspectX, 1]
                                    })
                                },
                                {
                                    scaleY: transitionProgress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [inlineAspectY, 1]
                                    }),
                                }
                            ]
                    }}>
                        <Animated.Image
                            source={image.source}
                            style={{
                                ...StyleSheet.absoluteFillObject,
                                transform: [
                                    {
                                        scaleX: transitionProgress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1 / inlineAspectX, 1]
                                        })
                                    },
                                    {
                                        scaleY: transitionProgress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1 / inlineAspectY, 1]
                                        }),
                                    }
                                ]
                            }}
                        />
                    </Animated.View>
                }
            </Animated.View>
        );
    }
    
    _renderDismissScrollView() {
        if (Platform.OS === "android") {
            return this._renderFlatList();
        }
    
        const { images, imageKey, onImageKeyChange } = this.props;
        const { width, height } = this.state;
        const image = images.find(im => im.key === imageKey);
    
        return (
            <Animated.ScrollView
                pagingEnabled={true}
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { y: this.state.dismissScrollProgress }
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
                {this._renderFlatList()}
                <Animated.View style={{ width, height }}/>
            </Animated.ScrollView>
        );
    }

    _getTransitionProgress() {
        const { openProgress, dismissProgress, dismissScrollProgress, height } = this.state;
        
        const outerViewerOpacity = openProgress || 1;
        let innerViewerOpacity = dismissScrollProgress.interpolate({
            inputRange: [0, height.__getValue(), height.__getValue() * 2],
            outputRange: [0, 1, 0]
        });
        
        if (dismissProgress) {
            innerViewerOpacity = dismissProgress;
        }
    
        const transitionProgress =
            openProgress || dismissProgress || innerViewerOpacity;
        
        return {
            innerViewerOpacity,
            transitionProgress,
            outerViewerOpacity
        }
    }
    
    _renderFlatList() {
        const { images, imageKey, onImageKeyChange } = this.props;
        const { width, height, openProgress, dismissProgress, canScrollHorizontal } = this.state;
    
        const image = images.find(im => im.key === imageKey);
        const initialIndex = images.findIndex(im => im.key === imageKey);
        
        const { transitionProgress } = this._getTransitionProgress();
        
        return (
            <FlatList
                scrollEnabled={!openProgress && !dismissProgress && canScrollHorizontal}
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
                            transitionProgress={transitionProgress}
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
        padding: 20
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