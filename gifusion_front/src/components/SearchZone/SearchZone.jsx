import React, { PureComponent } from 'react';

import debounce from 'lodash.debounce';
import { Row, Col, Input } from 'antd';

const { Search } = Input;

class SearchZone extends PureComponent {

  debouncedOnChange = debounce((text) => {
    this.props.search(text)
  }, 250);

  render() {
    return (
      <div>
        <Row>
          <Col xs={0} sm={3} md={4} lg={6} xl={8}></Col>
          <Col xs={24} sm={18} md={16} lg={12} xl={8}>
            <Search
              placeholder='Search some GIF!'
              onSearch={term => this.props.search(term)}
              onChange={(e) => this.debouncedOnChange(e.target.value)}
              autoFocus
              size='large'
              allowClear
            />
          </Col>
          <Col xs={0} sm={3} md={4} lg={6} xl={8}></Col>
        </Row>
      </div>
    );
  }
}

export default SearchZone;
