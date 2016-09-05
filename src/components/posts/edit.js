import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { fetchPost, updatePost } from '../../actions/index';

class PostsEdit extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }
  onCancel(e) {
    e.preventDefault();
    this.context.router.goBack();
  }
  onSubmit(props) {
    this.props.updatePost(this.props.params.id, props)
      .then(() => {
        this.context.router.goBack();
      }, (error) => {
        console.error(error);
      });
  }
  render() {
    const { fields: { title, content }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h1>Update Post</h1>
        <div className="input-group">
          <label>Title</label>
          <input className="form-control" type="text" {...title} />
        </div>
        <div className="input-group">
          <label>Content</label>
          <input className="form-control" type="text" {...content} />
        </div>
        <br />
        <button className="btn btn-default" onClick={this.onCancel}>Cancel</button>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }
}

PostsEdit.propTypes = {
  fetchPost: PropTypes.func,
  updatePost: PropTypes.func,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  params: PropTypes.object,
  post: PropTypes.object,
};

PostsEdit.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'PostsEditForm',
  fields: ['title', 'content'],
}, (state) => ({
  initialValues: state.posts.post,
}), { fetchPost, updatePost })(PostsEdit);
