import React, { PureComponent } from 'react';

import { Row } from 'antd';
import { getRndInteger } from '../../util.js';

const COLORS = ['#512DA8', '#D1C4E9', '#673AB7', '#757575', '#212121', '#9E9E9E', '#BDBDBD', '#9C27B0'];

class ImageToLoad extends PureComponent {
  state = {
    isLoaded: false
  }

  imageLoaded = () => {
    this.setState({isLoaded: true});
  }

  render() {
    return (
      <div>
        <Image
          url={this.props.url}
          width={this.props.width}
          height={this.props.height}
          imageLoaded={this.imageLoaded}
          style={{display: this.state.isLoaded ? 'block': 'none'}}
        />
        {!this.state.isLoaded &&
          <Row className='text-center'>
            <div
              style={{height: this.props.height, width:this.props.width, backgroundColor:COLORS[getRndInteger(0, 8)]}}>
            </div>
          </Row>
        }
      </div>
    );
  }
}

class Image extends PureComponent {
  render() {
    return (
      <img
        src={this.props.url}
        width={this.props.width}
        height={this.props.height}
        onLoad={this.props.imageLoaded}
        style={this.props.style}
        alt=''
      />
    );
  }
}

export default ImageToLoad;
