import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../template/commonHeader";
import {updateContent, getContent} from '../../redux/actions/contentActions';

class EditContent extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getContent(id);
    }

    componentWillReceiveProps(nextProps) {
        const { title, summary, details, comments, category }  = nextProps.content;
        this.setState({
            title,
            summary,
            details,
            comments,
            category
        });
    }

    state = {
        title: "",
        summary: "",
        details: "",
        comments: "",
        category: "",
        errors: {},
    };

    onChange = (e) =>
        this.setState({
        [e.target.name]: e.target.value,
    });

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const { title, summary, details, comments, category } = this.state;
        const { contentId, userDetailsId } = this.props.content;

        const content = {
        contentId : contentId,
        title: title,
        summary: summary,
        details: details,
        comments: comments,
        category: category,
        userDetailsId: userDetailsId,
        };
        this.props.updateContent(content);

        // Clear State
        this.setState({
            title: "",
            summary: "",
            details: "",
            comments: "",
            category: "",
            errors: {}
        });
 
        this.props.history.push('/dashboard');
    };

  render() {
    const { title, summary, details, comments, category, errors } = this.state;
    return (
      <div>
        <Header branding="News Feed"></Header>
        <br />
        <div
          className="Container"
          style={{ marginLeft: 100, marginRight: 100, marginTop: 50 }}
        >
          <form onSubmit={this.handleFormSubmit}>
            <h3>Add Content</h3>

            <div className="form-group">
              <label>Title </label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Enter Title"
                value={title}
                onChange={this.onChange}
                error={errors.title}
                required
              />
            </div>

            <div className="form-group">
              <label>Summary </label>
              <input
                type="text"
                className="form-control"
                name="summary"
                placeholder="Enter Summary"
                value={summary}
                onChange={this.onChange}
                error={errors.summary}
                required
              />
            </div>

            <div className="form-group">
              <label>Details </label>
              <textarea
                type="textarea"
                className="form-control"
                name="details"
                placeholder="Enter Details"
                rows="4"
                value={details}
                onChange={this.onChange}
                error={errors.details}
                required
              />
            </div>

            <div className="form-group">
              <label>Comments </label>
              <input
                type="text"
                className="form-control"
                name="comments"
                placeholder="Enter Comments"
                value={comments}
                onChange={this.onChange}
                error={errors.comments}
                required
              />
            </div>

            <div className="form-group">
              <label>Category </label>
              <input
                type="text"
                className="form-control"
                name="category"
                placeholder=" Select categories : ML/AI, Big Data, Micro-services"
                value={category}
                onChange={this.onChange}
                error={errors.category}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    content: state.ContentReducer.content
});

export default connect(mapStateToProps,{getContent,updateContent})(EditContent);
