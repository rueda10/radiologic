import React, { Component } from 'react';
import { Animated, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';

class ImagePane extends Component {
    _isZooming: boolean = false;
    _doubleTapTimeout: number = null;
    
    _handlePaneTap = () => {
        const { width, height, onShowOverlay, onHideOverlay, onToggleOverlay } = this.props;
        
        if (this._doubleTapTimeout) {
            clearTimeout(this._doubleTapTimeout);
            this._doubleTapTimeout = null;
            if (this._isZooming) {
                onShowOverlay();
                this._scrollView && this._scrollView.scrollResponderZoomTo({
                    x: 0,
                    y: 0,
                    width: width.__getValue(),
                    height: height.__getValue()
                });
            } else {
                onHideOverlay();
                this._scrollView && this._scrollView.scrollResponderZoomTo({
                    x: width.__getValue() / 4,
                    y: height.__getValue() / 4,
                    width: width.__getValue() / 2,
                    height: height.__getValue() / 2
                });
            }
            return;
        }
        
        this._doubleTapTimeout = setTimeout(() => {
            this._doubleTapTimeout = null;
            
            if (this._isZooming) {
                this._scrollView && this._scrollView.scrollResponderZoomTo({
                    x: 0,
                    y: 0,
                    width: width.__getValue(),
                    height: height.__getValue()
                });
                onShowOverlay();
            } else {
                onToggleOverlay();
            }
        }, 270);
    };
    
    render() {
        const { image, width, height, onImageRef, openProgress, onZoomEnd, onZoomStart } = this.props;
        let photoSize = null;
        
        const aspectRatio = image.width / image.height;
        const maxWidth = width.__getValue();
        const maxHeight = height.__getValue();
        const screenAspectRatio = maxWidth / maxHeight;

        if (aspectRatio > screenAspectRatio) {
            photoSize = {width: maxWidth, height: maxWidth / aspectRatio};
        } else {
            photoSize = {height: maxHeight, width: maxHeight * aspectRatio};
        }
        
        return (
            <Animated.View
                style={{
                    opacity: openProgress ?
                        openProgress.interpolate({
                            inputRange: [0, 0.99, 0.995],
                            outputRange: [0, 0, 1]
                        }) : 1
                }}
            >
                <Animated.View style={[styles.innerPane, { width, height }]}>
                    <ScrollView
                        ref={sv => { this._scrollView = sv; }}
                        horizontal={true}
                        alwaysBounceHorizontal={true}
                        alwaysBounceVertical={true}
                        maximumZoomScale={3}
                        scrollEventThrottle={32}
                        onScroll={e => {
                            const { zoomScale } = e.nativeEvent;
                            
                            if (this._isZooming && zoomScale === 1) {
                                onZoomEnd();
                                this._isZooming = false;
                            } else if (!this._isZooming && zoomScale !== 1) {
                                onZoomStart();
                                this._isZooming = true;
                            }
                        }}
                        style={[StyleSheet.absoluteFill]}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        centerContent
                    >
                        <TouchableWithoutFeedback onPress={this._handlePaneTap}>
                            <Animated.View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
                                <Animated.Image
                                    style={{width: photoSize.width, height: photoSize.height}}
                                    ref={onImageRef}
                                    source={image.source}
                                />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        );
    }
}

const styles = {
    innerPane: {
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default ImagePane;