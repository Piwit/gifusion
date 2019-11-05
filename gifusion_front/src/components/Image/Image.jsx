import React, { PureComponent } from 'react';

import { Spin, Row } from 'antd';

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
            <Spin delay={500}/>
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
