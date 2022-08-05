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
    console.log(event.target);
    this.setState({
      imgModal: { alt: event.target.alt, src: event.target.src },
    });

    this.toggleModal();
  };

  render() {
    console.log(this.state.imgModal);
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchWord={this.state.searchWord}
          onClick={this.onImageClick}
        />
        {this.state.showModal && <Modal imgForModal={this.state.imgModal} />}
      </div>
    );
  }
}
