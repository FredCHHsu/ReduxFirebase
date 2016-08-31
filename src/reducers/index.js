import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const Reducers = combineReducers({
  posts: PostsReducer,
  form: formReducer,
});

export default Reducers;
