import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import PropTypes from 'prop-types';

import ImageInnerViewer from "./ImageInnerViewer";

class ImageViewerImage extends Component {
    // Source image
    state = {
        opacity: new Animated.Value(1)
    };
    
    static contextTypes = {
        onSourceContext: PropTypes.func
    };
    
    setOpacity = (opacity) => {
        this.setState({ opacity })
    };
    
    render() {
        const { style, image } = this.props;
        const { opacity } = this.state;
        
        return (
            <Animated.Image
                style={[style, { opacity }]}
                source={image.source}
                resizeMode='cover'
                ref={im => {
                    this.context.onSourceContext(image.key, im, this.setOpacity);
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
        isOverlayOpen: true,
        topOffset: 0
    };
    
    _images: { [key: string]: Image } = {};
    _imageOpacitySetters: {
        [key: string]: (opacity: Animated.Value) => void
    } = {};
    
    static childContextTypes = {
        onSourceContext: PropTypes.func
    };
    
    getChildContext() {
        return { onSourceContext: this._onSourceContext };
    }
    
    _onSourceContext = (key, imageRef, setOpacity) => {
        this._images[key] = imageRef;
        this._imageOpacitySetters[key] = setOpacity;
    };
    
    open = (images, key) => {
        this.setState({ images, key })
    };
    
    close = () => {
        this.setState({ images: null, key: null });
    };
    
    changeImage = key => {
        this.setState({ key })
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
            <View ref='viewer'>
                {this.props.renderContent({onImageOpen: this.open})}
                {images &&
                    <ImageInnerViewer
                        topOffset={this.state.topOffset}
                        images={images}
                        imageKey={key}
                        sourceImageRef={this._images[key]}
                        sourceImageOpacitySetter={this._imageOpacitySetters[key]}
                        onClose={this.close}
                        renderOverlay={renderOverlay}
                        isOverlayOpen={isOverlayOpen}
                        setOverlay={this.setOverlay}
                        onImageChange={this.changeImage}
                    />
                }
            </View>
        );
    }
}

export default ImageViewer;