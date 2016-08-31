import firebase from 'firebase';
import {
  FETCH_POSTS,
  FETCH_POST,
} from './types';

const firebaseConfig = {
  apiKey: 'AIzaSyCUNle_b8BkZ1xEyelSemjQVc4-HBVL4tE',
  authDomain: 'test-c4b7f.firebaseapp.com',
  databaseURL: 'https://test-c4b7f.firebaseio.com',
  storageBucket: 'test-c4b7f.appspot.com',
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const Posts = database.ref('/posts');

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

export function fetchPosts() {
  return dispatch => {
    Posts.on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val(),
      });
    });
  };
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
  return () => Posts.child(id).set(post);
}


// function writeUserData(userId, name, gender) {
//   database.ref(`users/${userId}`).set({
//     name,
//     gender,
//   });
// }
// writeUserData(3, 'John', 'male');
