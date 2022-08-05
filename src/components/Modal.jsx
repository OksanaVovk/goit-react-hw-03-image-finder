import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    const { imgForModal } = this.props;
    console.log(imgForModal);
    return (
      <div className="overlay">
        <div className="modal">
          <img
            src={imgForModal.src}
            alt={imgForModal.alt}
            className="img_modal"
          />
        </div>
      </div>
    );
  }
}
