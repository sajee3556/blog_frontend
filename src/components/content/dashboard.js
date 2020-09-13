import React, { Component } from "react";
import {getContents} from '../../redux/actions/contentActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Content from '../content/content';
import Header from '../template/commonHeader';

class dashboard extends Component {
  state = {
    category : 'Micro-services'
  }
  componentDidMount(){
      this.props.getContents();
  }

  selectCategory = (e) => {
      this.setState({
        category : e.target.name
      })
  }

  render() {
    const {contents} = this.props;
    const {category} = this.state;
    return (
      <div>
        <Header branding="News Feed"></Header>
        <br/>
        <div className ="Container" style = {{ marginLeft : 20 }}>
          <button variant="outline-success" onClick={this.selectCategory} name='Micro-services'>Micro Service</button>
          <button variant="outline-success" onClick={this.selectCategory} name='ML/AI'>MI/AL</button>
          <button variant="outline-success" onClick={this.selectCategory} name='Big Data'>Big Data</button>
          <button variant="outline-success" onClick={this.selectCategory} name='other-categories'>Other categories</button>
        </div>
        <div>
            {contents.filter(content => content.category === category).slice(0, 20).map( (_content) => 
                <Content key={_content.contentId} content={_content}/>
            )}
        </div>
      </div>
    );
  }
}

dashboard.prototypes = {
    contents: PropTypes.array.isRequired,
    getContents: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    contents : state.ContentReducer.contents
});

export default connect(mapStateToProps, {getContents})(dashboard);