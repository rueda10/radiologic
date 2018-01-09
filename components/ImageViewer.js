import React, { Component } from 'react';
import { View } from 'react-native';

import ImageInnerViewer from "./ImageInnerViewer";

class ImageViewer extends Component {
    state = {
        images: null,
        topOffset: 0
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
    
    open = (images, image) => {
        this.setState({images, currentImage: image})
    };
    
    close = () => {
        this.setState({images: null, currentImage: null});
    };
    
    render() {
        const {images, currentImage} = this.state;
        
        return (
            <View ref='viewer'>
                {this.props.renderContent({onImageOpen: this.open})}
                {images &&
                    <ImageInnerViewer topOffset={this.state.topOffset} images={images} currentImage={currentImage} onClose={this.close} />
                }
            </View>
        );
    }
}

export default ImageViewer;