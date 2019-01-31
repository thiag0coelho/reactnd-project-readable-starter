import {
    RECEIVE_POSTS,
    REQUEST_POSTS,
  } from '../actions';
  
  export const posts = (state = { data: [], loading: false }, action) => {
    switch (action.type) {
    case REQUEST_POSTS:
      return { loading: true, data: [] };
    case RECEIVE_POSTS:
      return { loading: false, data: action.posts };
    default:
      return state;
    }
  };
  