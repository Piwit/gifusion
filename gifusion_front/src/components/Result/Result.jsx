import React, { Component } from 'react';
import Masonry from 'react-masonry-css';

import Gif from '../Gif/Gif';

const breakpointColumnsObj = {
  default: 9,
  450: 1,
  480: 2,
  600: 2,
  800 : 3,
  992: 4,
  1200: 5,
  1800: 6
};

class Result extends Component {
  render() {
    return (
      <Masonry breakpointCols={breakpointColumnsObj}
        className='gif-masonry'
        columnClassName='gif-col'>
        {this.props.gifs.map((gif, index) => (
          <div className="gif" key={index}>
            <Gif
              url={gif.url}
              shareUrl={gif.shareUrl}
              width={gif.width}
              height={gif.height}
              source={gif.source}
            />
          </div>
        ))}
      </Masonry>
    )
  }
}

export default Result;
