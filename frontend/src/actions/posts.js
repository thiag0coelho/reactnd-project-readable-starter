import * as api from '../client';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';

export const receivePosts = (category, posts) => ({
  type: RECEIVE_POSTS,
  posts,
  category
});

export const requestPosts = (category) => {
  return {
    type: REQUEST_POSTS,
    category
  };
};

export const fetchPosts = (category) => {
  return (dispatch) => {
    dispatch(requestPosts(category));
    return api
      .getPosts(category)
      .then((json) => dispatch(receivePosts(category, json)));
  };
};
