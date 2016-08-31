import {
  FETCH_POSTS,
  FETCH_POST,
} from '../actions/types';

const INITIAL_STATE = { post: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case FETCH_POST:
      return { ...state, post: action.payload };
    default:
      return state;
  }
}
