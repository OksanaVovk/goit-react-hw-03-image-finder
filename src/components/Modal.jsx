import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { imgForModal } = this.props;
    return createPortal(
      <div className="overlay" onClick={this.handleBackdrop}>
        <div className="modal">
          <img
            src={imgForModal.large}
            alt={imgForModal.small}
            className="img_modal"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
