import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Signup from './components/auth/signup';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';

import requireAuth from './components/auth/require_auth';
import PostsIndex from './components/posts/index';
import PostsNew from './components/posts/new';
import PostEdit from './components/posts/edit';
import PostShow from './components/posts/show';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="/signin" component={Signin} />
    <Route path="/signup" component={Signup} />
    <Route path="/signout" component={Signout} />
    <Route path="posts/new" component={requireAuth(PostsNew)} />
    <Route path="posts/:id/edit" component={requireAuth(PostEdit)} />
    <Route path="posts/:id" component={PostShow} />
  </Route>
);
