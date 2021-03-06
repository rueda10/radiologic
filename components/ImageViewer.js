import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import PropTypes from 'prop-types';

import ImageInnerViewer from "./ImageInnerViewer";

class ImageViewerImage extends Component {
    // THIS IS THE SOURCE IMAGE
    state = {
        opacity: new Animated.Value(1)
    };
    
    static contextTypes = {
        onSourceContext: PropTypes.func
    };
    
    componentWillMount() {
        const { image } = this.props;
        this.context.onSourceContext(image.key, this.measure, this.setOpacity);
    }
    
    setOpacity = (opacity) => {
        this.setState({ opacity })
    };
    
    measure = async () => {
        if (!this._imageRef && !this._readyToMeasure) {
        
        }
        return new Promise((resolve, reject) => {
            this._imageRef.getNode().measure((imgX, imgY, imgWidth, imgHeight, imgPageX, imgPageY) => {
                resolve({
                    width: imgWidth,
                    height: imgHeight,
                    x: imgPageX,
                    y: imgPageY
                });
            }, reject);
        });
    };
    
    render() {
        const { style, image } = this.props;
        const { opacity } = this.state;
        
        const aspectRatio = image.width / image.height;
        
        return (
            <Animated.Image
                style={[style, { opacity }]}
                source={image.source}
                resizeMode={ aspectRatio > 0.461 && aspectRatio < 1.5 ? 'contain' : 'cover'}
                ref={im => {
                    this._imageRef = im;
                }}
                onLayout={() => {
                    this._readyToMeasure = true;
                }}
            />
        );
    }
}

class ImageViewer extends Component {
    static Image = ImageViewerImage;
    
    state = {
        images: null,
        key: null,
        isOverlayOpen: false,
        topOffset: 0
    };
    
    _imageMeasurers: { [key: string]: () => void } = {};
    _imageOpacitySetters: { [key: string]: (opacity: Animated.Value) => void } = {};
    
    static childContextTypes = {
        onSourceContext: PropTypes.func
    };
    
    getChildContext() {
        return { onSourceContext: this._onSourceContext };
    }
    
    _onSourceContext = (key, imageMeasurer, setOpacity) => {
        this._imageMeasurers[key] = imageMeasurer;
        this._imageOpacitySetters[key] = setOpacity;
    };
    
    _getSourceContext = (key: string) => {
        return {
            measurer: this._imageMeasurers[key],
            setOpacity: this._imageOpacitySetters[key]
        };
    };
    
    open = (images, key) => {
        this.setState({ images, key, isOverlayOpen: false })
    };
    
    close = () => {
        this.setState({ images: null, key: null });
    };
    
    changeImage = (key, index) => {
        this.setState({ key });
        this.props.scrollToClosingIndex(index);
    };
    
    setOverlay = isOverlayOpen => {
        this.setState({ isOverlayOpen })
    };
    
    componentDidMount() {
        setTimeout(this.measureComponent.bind(this));
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.renderContent !== this.props.renderContent) {
            setTimeout(this.measureComponent.bind(this));
        }
    }
    
    measureComponent() {
        this.refs.viewer.measure((ox, oy, width, height, px, py) => {
            this.setState({
                topOffset: height + py
            })
        });
    }
    
    render() {
        const { images, key, isOverlayOpen } = this.state;
        const { renderOverlay } = this.props;
        
        return (
            <View
                ref='viewer'
                renderToHardwareTextureAndroid={true}
            >
                {this.props.renderContent({onImageOpen: this.open})}
                {images &&
                    <ImageInnerViewer
                        topOffset={this.state.topOffset}
                        images={images}
                        imageKey={key}
                        getSourceContext={this._getSourceContext}
                        onClose={this.close}
                        renderOverlay={renderOverlay}
                        isOverlayOpen={isOverlayOpen}
                        setOverlay={this.setOverlay}
                        onImageChange={this.changeImage}
                        scrollToClosingIndex={this.props.scrollToClosingIndex}
                    />
                }
            </View>
        );
    }
}

export default ImageViewer;