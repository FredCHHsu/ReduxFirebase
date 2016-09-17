import postsSaga from './posts';

export default function* rootSaga() {
  yield* [
    postsSaga(),
  ];
}
