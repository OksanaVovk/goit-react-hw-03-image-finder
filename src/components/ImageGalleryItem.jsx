const ImageGalleryItem = ({ id, large, small }) => (
  <li key={id} className="gallery-item">
    <img src={small} alt={large} className="gallery-img" />
  </li>
);

export default ImageGalleryItem;
