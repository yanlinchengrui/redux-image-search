import React, { Component } from 'react';
import { connect } from 'react-redux'
import { actions } from './reduxStore';

const randomWords = require('random-words');

class App extends Component {

  componentDidMount() {
    this.props.onGetImages(randomWords());
  }

  formSubmitted(event) {
    event.preventDefault();
    this.props.searchTerm && this.props.onPageChanged(1);
    this.props.onGetImages(this.props.searchTerm || this.props.defaultTerm, this.props.searchTerm ? 1 : this.props.page);
  }

  render() {
    const { title, searchTerm, loading, images, defaultTerm, page } = this.props;

    return (
      <div>
        <h1>{title} <a href="https://pixabay.com/"> PIXABAY </a></h1>
        <form onSubmit={(event) => this.formSubmitted(event)}>
          <label htmlFor="searchTerm">Search Term</label>
          <input
            onChange={(event) => this.props.onSearchTermChanged(event.target.value)}
            value={searchTerm}
            placeholder={defaultTerm}
            className="u-full-width"
            type="text"
            id="searchTerm"
            name="searchTerm" />
          <button type="submit"> Search </button>
          <button type="submit" style={{ float: "right", marginLeft: "5px" }} onClick={() => this.props.onPageChanged(page + 1)}> Next </button>
          <h5 style={{ float: "right", margin: 0 }}> {page} </h5>
          <button type="submit" style={{ float: "right", marginRight: "5px" }} onClick={() => this.props.onPageChanged(page > 1 ? this.props.page - 1 : 1)}> Prev </button>
        </form>
        {loading && <img alt="Loading..." src="https://i.imgur.com/LVHmLnb.gif" />}
        <section className="images">
          {images.map(image => {
            return <img key={image.id} alt={image.id} src={image.largeImageURL} onClick={() => window.open(image.largeImageURL, "_blank")} />
          })}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.title,
    searchTerm: state.searchTerm,
    loading: state.loading,
    images: state.images,
    defaultTerm: state.defaultTerm,
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchTermChanged(searchTerm) {
      dispatch(actions.searchTermCHanged(searchTerm));
    },
    onGetImages(searchTerm, page) {
      dispatch(actions.getImages(searchTerm, page));
    },
    onPageChanged(page) {
      dispatch(actions.pageChanged(page));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
