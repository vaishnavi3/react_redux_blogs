import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // when we call actioncreator inside of an actioncreator
  // we need to call it with dispatch.
  await dispatch(fetchPosts());
  // used await becoz we dont want any action to be taken unless all
  // posts r fetched.

  // extract all uniq userIds using lodash
  const userIds = _.uniq(_.map(getState().posts, 'userId'))

  // iterae thrgh each id and fetch the user.
  // no need of 'await' ,becoz we dont care when all users r fetched.
  // also u cannot use await inside of forEach.
  userIds.forEach(id => dispatch(fetchUser(id)));

  // above 2 lines of code can be combined using lodash's chain() method
  // _.chain(getState().posts)
  //   .map('userId')
  //   .uniq()
  //   .forEach(id => dispatch(fetchUser(id)))
  //   .value()
  // .value() method is reqd after a chain() method
  // otherwise it will not get executed/

};

// returning a function from a function using a middleware
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

// not good becoz gives a call to network request for each id multiple times
// eg: user with id 1 is called 10 times as we have 10 posts of that user.
// export const fetchUser = (id) => async dispatch => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// }

// ===============================================
// using lodash memoize fn to help give a netwok call only once
// memoize gives a call to only unique requests & all further requests r
// shown as it is from memory.

// export const fetchUser = id => dispatch => {
//   _fetchUser(id, dispatch);
// };
// // this is a private fn.Think before u change it!
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });

// memoization has a drawback---->if ever any specific user
// is updated on the api with the same id whih memoization has kept
// in memory....its not possible to refetch the data as memoization will
// alwz try to return whateever is in memry
// =================================================
