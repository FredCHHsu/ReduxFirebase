import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../../actions/index';


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
        {this.props.currentUser ?
          <Link className="btn btn-primary" to="/posts/new">New Post</Link>
          : null
        }
        <hr />
        {this.props.currentUser && this.props.posts ?
          (Object.keys(this.props.posts).map((key) => (
          this.props.posts[key] ?
            <div key={key}>
              <span>
                <Link to={`/posts/${key}`} >
                  {this.props.posts[key].title}
                </Link>
              </span>
              {this.props.posts[key].user_id === this.props.currentUser.uid ?
                <span className="pull-right">
                  <Link
                    to={`/posts/${key}/edit`}
                    className="btn btn-sm btn-success"
                  >Edit</Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.props.deletePost(key)}
                  >Delete</button>
                </span> : null
              }
              <hr />
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
  currentUser: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
    currentUser: state.auth.currentUser,
  };
}

export default connect(mapStateToProps, { fetchPosts, deletePost })(PostsIndex);
