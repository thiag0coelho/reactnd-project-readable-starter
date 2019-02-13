import { Grid } from 'semantic-ui-react';
import React, { Component } from 'react';
import {
  getPosts,
} from './actions/posts';

import PropTypes from 'prop-types';
import PostList from './components/PostList';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    const { getPosts  } = this.props;
    getPosts();
  }

  render() {
    return (
      <div className="app">
        <Grid container style={{ padding: '5em 0em' }}>
            <PostList />
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.object.isRequired,
  dismissMessage: PropTypes.func.isRequired
};

const mapStateToProps = ({ posts, }) => ({
  posts,
});

const actionCreators = {
  getPosts,
};

export default connect(mapStateToProps, actionCreators)(App);
