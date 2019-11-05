import React, { PureComponent } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Share } from 'react-facebook';
import { Button, notification } from 'antd';

import ImageToLoad from '../Image/Image';

class Gif extends PureComponent {
  copy = (e) => {
      const copyText = document.createElement('textarea');
      copyText.innerText = this.props.shareUrl
      document.body.appendChild(copyText);
      copyText.select();
      copyText.setSelectionRange(0, 99999)
      document.execCommand('copy');
      copyText.remove();
      notification['success']({
        message: 'Link has been copied to your clipboard',
        duration: 1
      });
  }

  render() {
    return (
      <div>
        <a target='_blank' rel='noopener noreferrer' href={this.props.shareUrl}>
          <CSSTransitionGroup
            transitionName="gif"
            transitionAppear={true}
            transitionAppearTimeout={500}>
              <ImageToLoad
                url={this.props.url}
                width={this.props.width}
                height={this.props.height}
                />
          </CSSTransitionGroup>
        </a>
        <div>
          <span>{this.props.source}</span>
          <div className='share-button'>
            <Button title='Copy link' style={{backgroundColor: '#303030', color:'#ffffff'}} onClick={this.copy}><i className='fas fa-paperclip'></i></Button>
            <Share href={this.props.shareUrl}>
              {({ handleClick, loading }) => (
                <Button title='Share on facebook' style={{backgroundColor:'#1877f2', color:'#ffffff'}} disabled={loading} onClick={handleClick}><i className='fab fa-facebook-f'></i></Button>
              )}
            </Share>
          </div>
        </div>
      </div>
    );
  }
}

export default Gif;
