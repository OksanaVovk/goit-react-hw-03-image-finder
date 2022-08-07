// import fetchImages from 'fetchImages';
import Loader from './Loader';
import Button from './Button';
import ImageGalleryItem from './ImageGalleryItem';
import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ImageGallery extends Component {
  state = {
    images: null,
    hits: [],
    status: 'idle',
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const KEY = `27331775-d4865903e456a7e108fc4ea1d`;
    const prevWord = prevProps.searchWord;
    const nextWord = this.props.searchWord;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const URL = `https://pixabay.com/api/?q=${nextWord}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    if (prevWord !== nextWord) {
      this.setState({ page: 1, images: null, hits: [] });
    }
    if (prevWord !== nextWord || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      fetch(URL)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`The image ${nextWord} didn't find`));
        })
        .then(data =>
          this.setState(prevState => ({
            hits: [...prevState.hits, ...data.hits],
            images: data,
            status: 'resolved',
          }))
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onLoadButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, error, hits } = this.state;
    const { onImgClick, searchWord } = this.props;
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      if (images.totalHits === 0) {
        Notify.info(`The image ${searchWord} didn't find`);
      }
      if (images.totalHits > 12 && images.totalHits > hits.length) {
        return (
          <>
            <ul className="gallery" onClick={onImgClick}>
              {hits.map(image => (
                <ImageGalleryItem
                  id={image.id}
                  large={image.largeImageURL}
                  small={image.webformatURL}
                />
              ))}
            </ul>
            <Button loadMoreClick={() => this.onLoadButtonClick()} />
          </>
        );
      } else {
        return (
          <ul className="gallery" onClick={onImgClick}>
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
    }
    if (status === 'rejected') {
      Notify.info({ error });
    }
  }
}
