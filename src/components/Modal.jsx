import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    const imgForModal = this.props.imgModal;
    console.log(imgForModal);
    return (
      <div className="overlay">
        <div className="modal">
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}
