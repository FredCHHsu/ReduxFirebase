import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCUNle_b8BkZ1xEyelSemjQVc4-HBVL4tE',
  authDomain: 'test-c4b7f.firebaseapp.com',
  databaseURL: 'https://test-c4b7f.firebaseio.com',
  storageBucket: 'test-c4b7f.appspot.com',
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();
