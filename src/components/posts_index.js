import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions/index';


class PostsIndex extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentWillMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <div>
        <h1>Posts Index</h1>
        <Link to="/posts/new">New Post</Link>
        <hr />
        {this.props.posts ?
          (Object.keys(this.props.posts).map((key) => (
          this.props.posts[key] ?
            <div key={key}>
              <h3>
                <Link to={`/posts/${key}`} >
                  {this.props.posts[key].title}
                </Link>
              </h3>
              <button onClick={() => this.props.deletePost(key)}>Delete</button>
              <br />
            </div> : null
        ))) : null}
      </div>
    );
  }
}

PostsIndex.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func,
  posts: PropTypes.object,
};

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts, deletePost })(PostsIndex);
