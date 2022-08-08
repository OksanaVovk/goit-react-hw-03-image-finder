import Searchbar from './Searchbar';
import Modal from './Modal';
import ImageGallery from './ImageGallery';
import { Component } from 'react';

export default class App extends Component {
  state = {
    searchWord: '',
    showModal: false,
    imgModal: null,
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  handleFormSubmit = searchWord => {
    this.setState({ searchWord });
  };

  onImageClick = event => {
    this.setState({
      imgModal: { large: event.target.alt, small: event.target.src },
    });

    this.toggleModal();
  };

  render() {
    return (
      <div className="app">
        {this.state.showModal && (
          <Modal imgForModal={this.state.imgModal} onClose={this.toggleModal} />
        )}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchWord={this.state.searchWord}
          onImgClick={this.onImageClick}
        />
      </div>
    );
  }
}
