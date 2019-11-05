import React, { PureComponent } from 'react';

import { Typography } from 'antd';

import maya1 from './maya/loading1.gif';
import maya2 from './maya/loading2.gif';
import maya3 from './maya/loading3.webp';
import maya4 from './maya/loading4.gif';
import maya5 from './maya/loading5.gif';
import maya6 from './maya/loading6.gif';
import { getRndInteger } from '../../util.js';

const { Title } = Typography;

class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.gifs = [maya1, maya2, maya3, maya4, maya5, maya6]
  }

  render() {
    const choosed_gif = this.gifs[getRndInteger(0, 6)];
    return (
      <div className='center'>
        <Title level={3}>Searching GIF...</Title>
        {this.props.withImage &&
          <img src={choosed_gif} alt='Loading screen with Maya the bee, bzz bzzz'/>
        }
      </div>
    )
  }
}

export default Loading
