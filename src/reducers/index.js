import { combineReducers } from 'redux';
import postsReducers from './postsReducers'
import usersReducers from './usersReducers';

export default combineReducers({
  posts: postsReducers,
  users: usersReducers
});
