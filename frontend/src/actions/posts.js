import * as ReadableAPI from "../util/api";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const requestPosts = () => {
  return {
    type: REQUEST_POSTS
  };
};

export const receivePosts = posts => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};

export const getPosts = () => dispatch => {
  dispatch(requestPosts());
  ReadableAPI.getPosts().then(posts => {
    dispatch(receivePosts(posts));
  });
};