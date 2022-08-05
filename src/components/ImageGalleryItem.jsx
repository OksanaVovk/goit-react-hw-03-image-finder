const ImageGalleryItem = ({ id, large, small }) => (
  <li key={id} className="gallery-item">
    <img src={large} alt={small} className="gallery-img" />
  </li>
);

export default ImageGalleryItem;
