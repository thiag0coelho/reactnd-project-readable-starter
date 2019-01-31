import './PostList.css';

import {
  Container,
  List,
  Segment
} from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class PostList extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
  };

  render() {

    const posts = this.props.posts.data;

    const postItems = posts.map((post) => {
      return (
        <List.Item key={post.id}>
          <List.Content floated="left">
          </List.Content>
          <List.Content>
            <List.Header>
              {post.title || 'no title'}
            </List.Header>
            <List.Description>
              Test
              <div className="PostList-comments">
                {post.commentCount} comments
              </div>
              <List horizontal>
                <List.Item>
                  Edit
                </List.Item>
                <List.Item>
                  Delete
                </List.Item>
              </List>
            </List.Description>
          </List.Content>
        </List.Item>
      );
    });

    const title = 'readable';

    return (
      <Container text>
          <title>{title}</title>
        <header>
        </header>
        <Segment loading={this.props.posts.loading}>
          <List divided relaxed size="large">
            {postItems}
            {!(posts.length || posts.loading) && <p>No posts yet.</p>}
          </List>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts,
});

export default connect(mapStateToProps)(PostList);
