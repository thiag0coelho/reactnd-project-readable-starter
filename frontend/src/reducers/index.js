import { combineReducers } from "redux";
import {
  RECEIVE_POSTS,
  REQUEST_POSTS
} from "../actions/posts";

function posts(state = { items: [], isFetching: false }, action) {
  switch (action.type) {
    case REQUEST_POSTS: {
      return {
        ...state,
        isFetching: true
      };
    }

    case RECEIVE_POSTS: {
      const { posts } = action;

      return {
        ...state,
        items: posts.filter(post => !post.deleted),
        isFetching: false
      };
    }
    default:
      return state;
  }
}


export default combineReducers({
  posts,
});
