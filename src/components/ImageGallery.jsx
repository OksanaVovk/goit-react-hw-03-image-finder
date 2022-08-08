import fetchImages from 'fetchImages';
import Loader from './Loader';
import Button from './Button';
import ImageGalleryItem from './ImageGalleryItem';
import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ImageGallery extends Component {
  state = {
    totalHits: null,
    hits: [],
    status: 'idle',
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevWord = prevProps.searchWord;
    const nextWord = this.props.searchWord;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevWord !== nextWord) {
      this.setState({ page: 1, images: null, hits: [] });
    }
    if (prevWord !== nextWord || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      fetchImages(nextWord, nextPage)
        .then(data =>
          this.setState(prevState => ({
            hits: [...prevState.hits, ...data.hits],
            totalHits: data.totalHits,
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
    const { totalHits, hits, status, error } = this.state;
    const { onImgClick, searchWord } = this.props;
    if (totalHits === 0) {
      Notify.info(`The image ${searchWord} didn't find`);
    }
    if (hits.length > 0) {
      return (
        <>
          <ul className="gallery">
            {hits.map(image => (
              <ImageGalleryItem
                onImgCl={onImgClick}
                id={image.id}
                large={image.largeImageURL}
                small={image.webformatURL}
              />
            ))}
          </ul>
          {status === 'pending' && <Loader />}
          {totalHits > 12 && totalHits > hits.length && (
            <Button loadMoreClick={() => this.onLoadButtonClick()} />
          )}
        </>
      );
    }
    if (status === 'rejected') {
      Notify.info({ error });
    }
  }
}
