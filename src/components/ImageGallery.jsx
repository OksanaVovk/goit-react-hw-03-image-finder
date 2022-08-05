// import fetchImages from 'fetchImages';
import Loader from './Loader';
import ImageGalleryItem from './ImageGalleryItem';
import { Component } from 'react';

export default class ImageGallery extends Component {
  state = {
    images: null,
    status: 'idle',
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const KEY = `27331775-d4865903e456a7e108fc4ea1d`;
    let page = 1;
    const prevWord = prevProps.searchWord;
    const nextWord = this.props.searchWord;
    const URL = `https://pixabay.com/api/?q=${nextWord}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    if (prevWord !== nextWord) {
      this.setState({ status: 'pending' });
      fetch(URL)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`The image ${nextWord} didn't find`));
        })
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  render() {
    const { images, status, error } = this.state;
    const { onClick } = this.props;
    if (status === 'idle') {
      return <div>Введіть інформацію для пошуку картин.</div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <ul className="gallery" onClick={onClick}>
          {images.hits.map(image => (
            <ImageGalleryItem
              id={image.id}
              large={image.largeImageURL}
              small={image.webformatURL}
            />
          ))}
        </ul>
      );
    }
    if (status === 'rejected') {
      return <div>{error}</div>;
    }
  }
}
