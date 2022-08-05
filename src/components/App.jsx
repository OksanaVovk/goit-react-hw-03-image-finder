import Searchbar from './Searchbar';
import Modal from './Modal';
import ImageGallery from './ImageGallery';
import { Component } from 'react';

export default class App extends Component {
  state = {
    searchWord: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  handleFormSubmit = searchWord => {
    this.setState({ searchWord });
  };

  onImageClick = () => {
    console.log('click');
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchWord={this.state.searchWord}
          onClick={this.onImageClick}
        />
        {this.state.showModal && <Modal />}
      </div>
    );
  }
}
