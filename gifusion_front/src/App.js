import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FacebookProvider } from 'react-facebook';
import debounce from 'lodash.debounce';

import { Typography } from 'antd';

import SearchZone from './components/SearchZone/SearchZone';
import Result from './components/Result/Result';
import Loading from './components/Loading/Loading';
import { search } from './actions/search.js';
import notFoundAnyGif from './notFoundAnyGif.png';
import { chooseHappyWord } from './word.js';

import { FB_API_KEY } from './key.js';

const { Title } = Typography;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      term: '',
      page: 0,
      isLoading: false,
      searched: false
    };
    window.onscroll = debounce(() => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        this.setState({page: this.state.page + 1},
          () => this.searchGifs(this.state.term)
        );
      }
    }, 100);
    // If screen is big, 50 gifs could not be enough to fill completly the screen, adding a scrollbar
    // Detect if user try to scroll down, add 50 others GIFS, if it is not enough, then it's too bad
    window.onwheel = debounce(() => {
      if (this.state.page === 0 && this.state.gifs.length > 0)
        this.setState({page: this.state.page + 1},
          () => this.searchGifs(this.state.term)
        );
    }, 100);
  }

  componentDidMount = (term) => {
    this.launchSearch(chooseHappyWord());
  }

  searchGifs = (term) => {
    search(term, this.state.page
      ).then(body => {
        this.setState(state => {
          const gifs = state.gifs.concat(body.data);
          return {gifs, isLoading: false};
        });
      });
    this.setState({isLoading: true})
  }

  launchSearch = (term) => {
    this.setState({gifs: [], term: term, page: 0, searched: true},
      () => this.searchGifs(term)
    );
  }

  render() {
    return (
      <div>
        <FacebookProvider appId={FB_API_KEY}>
          <Title>GIFusion</Title>
          <Title level={4}>Search GIF from various GIF database</Title>
          <SearchZone search={this.launchSearch} />
          <p></p>
          <Result gifs={this.state.gifs} />
          {this.state.page === 0 && this.state.gifs.length === 0
            && !this.state.isLoading && this.state.searched &&
            <div className='center'>
              <Title level={3}>We did not found any gif, sorry :(</Title>
              <img src={notFoundAnyGif} alt='Maya is sorry, she did not found any GIFs'/>
            </div>
          }
          {this.state.isLoading &&
            <Loading
              withImage={this.state.page === 0}/>
          }
        </FacebookProvider>
      </div>
    );
  }
}

export default App;
