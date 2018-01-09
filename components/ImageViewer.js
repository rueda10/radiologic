import React, { Component } from 'react';
import { View, Image } from 'react-native';

import ImageInnerViewer from "./ImageInnerViewer";

class ImageViewerImage extends Component {
    render() {
        const { style, image } = this.props;
        
        return (
            <Image
                style={style}
                source={{uri: image, cache: 'force-cache'}}
                resizeMode='contain'
            />
        );
    }
}

class ImageViewer extends Component {
    static Image = ImageViewerImage;
    
    state = {
        images: null,
        currentImage: null,
        isOverlayOpen: true,
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
    
    changeImage = currentImage => {
        this.setState({ currentImage })
    };
    
    setOverlay = isOverlayOpen => {
        this.setState({ isOverlayOpen })
    };
    
    render() {
        const { images, currentImage, isOverlayOpen } = this.state;
        const { renderOverlay } = this.props;
        
        return (
            <View ref='viewer'>
                {this.props.renderContent({onImageOpen: this.open})}
                {images &&
                    <ImageInnerViewer
                        topOffset={this.state.topOffset}
                        images={images}
                        currentImage={currentImage}
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