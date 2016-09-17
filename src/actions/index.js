import firebase from 'firebase';
import { browserHistory } from 'react-router';
import {
  FETCH_POSTS,
  FETCH_POSTS_RT,
  FETCH_POST,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_USER,
} from './types';

import database from '../firebaseConfig.js';
const Posts = database.ref('/posts');
const Users = database.ref('/users');

// function createPostOnDB(props) {
//   // A post entry.
//   const postData = {
//     title: props.title,
//     content: props.content,
//   };
//   // Get a key for a new Post.
//   const newPostKey = database.ref().child('posts').push().key;
//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   const updates = {};
//   updates[`/posts/${newPostKey}`] = postData;
//   return database.ref().update(updates);
// }
// ======================================================

export function checkAuthState() {
  return dispatch => {
    firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          // console.log('user: ', user);
          // console.log(firebase.auth().currentUser);
          dispatch({ type: AUTH_USER, payload: user });
        }
      });
  };
}

export function signinUser({ email, password }) {
  return dispatch => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: AUTH_USER, payload: user });
        // console.log(user);
        browserHistory.push('/');
      })
      .catch(error => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ...
        dispatch({ type: AUTH_ERROR, payload: error.message });
      });
  };
}

export function signoutUser() {
  return dispatch => {
    firebase.auth()
      .signOut()
      .then(() => {
        dispatch({ type: UNAUTH_USER });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

// ======================================================

export function fetchUser(id) {
  return dispatch => {
    Users.child(id).on('value', snapshot => {
      dispatch({
        type: FETCH_USER,
        payload: snapshot.val(),
      });
    });
  };
}

// ======================================================

export function fetchPostsRT() { // realtime database
  return dispatch => {
    Posts.on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS_RT,
        payload: snapshot.val(),
      });
    });
  };
}

export function fetchPosts() {
  return { type: FETCH_POSTS };
}

export function fetchPost(id) {
  return dispatch => {
    Posts.child(id).on('value', snapshot => {
      dispatch({
        type: FETCH_POST,
        payload: snapshot.val(),
      });
    });
  };
}

export function createPost(post) {
  return () => Posts.push(post);
}

export function deletePost(id) {
  return () => Posts.child(id).remove();
}

export function updatePost(id, post) {
  return () => Posts.child(id).update(post);
}


// function writeUserData(userId, name, gender) {
//   database.ref(`users/${userId}`).set({
//     name,
//     gender,
//   });
// }
// writeUserData(3, 'John', 'male');
