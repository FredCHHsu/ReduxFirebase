import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions/index';
import { Link } from 'react-router';

class PostShow extends React.Component {
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/" className="btn btn-default">Back to Post Index</Link>
        </div>
        {this.props.post ? (
          <div>
            <h2>{this.props.post.title}</h2>
            <p>{this.props.post.content}</p>
          </div>
        ) : null}
        <div>
          <Link to={`/posts/${this.props.params.id}/edit`} className="btn btn-default">Edit</Link>
        </div>
      </div>
    );
  }
}

PostShow.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  params: PropTypes.object,
  post: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    post: state.posts.post,
  };
}

export default connect(mapStateToProps, { fetchPost })(PostShow);
