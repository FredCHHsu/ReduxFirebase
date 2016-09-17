import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  FETCH_POSTS,
  FETCHING_POSTS,
  FETCH_POSTS_COMPLETED,
  FETCH_POSTS_FAILED,
} from '../actions/types';

import database from '../firebaseConfig.js';
const Posts = database.ref('/posts');

// const posts = Posts.on('value', snapshot => snapshot.val());
// console.log(posts);

const apiFetchPosts = () =>
  Posts.once('value').then(snapshot => snapshot.val());
  // posts;

// https://github.com/yelouafi/redux-saga/issues/74
// function registerPostsListener() {
//   let listener;
//   const listenerID = Posts.on('value', snapshot => {
//     if (listener) {
//       listener.on(snapshot.val());
//       listener = null;
//     }
//   });
//
//   return {
//     listenerID,
//     getData() {
//       if (!listenerID) {
//         listener = {};
//         listener.promise = new Promise(response => listener.on = response);
//       }
//       return listener.promise;
//     },
//   };
// }

function* fetchPosts() {
  // const request = Posts.on('value', snapshot => snapshot.val());
  // yield put({ type: FETCH_POSTS_COMPLETED, payload: request });
  try {
    yield put({ type: FETCHING_POSTS });
    const request = yield call(apiFetchPosts);
    yield put({ type: FETCH_POSTS_COMPLETED, payload: request });
  } catch (e) {
    yield put({ type: FETCH_POSTS_FAILED, message: e.message });
  }
}

export default function* postsSaga() {
  yield* [
    takeEvery(FETCH_POSTS, fetchPosts),
  ];
}
