import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import AuthReducer from './reducer_auth';
import UsersReducer from './reducer_users';

const Reducers = combineReducers({
  auth: AuthReducer,
  users: UsersReducer,
  posts: PostsReducer,
  form: formReducer,
});

export default Reducers;
