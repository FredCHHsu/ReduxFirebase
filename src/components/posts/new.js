import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/');
      }, (error) => {
        console.error(error);
      });
  }
  render() {
    const { fields: { title, content }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h1>Create New Post</h1>
        <div>
          <label>Title</label>
          <input className="form-control" type="text" {...title} />
        </div>
        <div>
          <label>Content</label>
          <input className="form-control" type="text" {...content} />
        </div>
        <br />
        <Link to="/" className="btn btn-default">Cancel</Link>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }
}

PostsNew.propTypes = {
  createPost: PropTypes.func,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

PostsNew.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'content'],
}, null, { createPost })(PostsNew);
