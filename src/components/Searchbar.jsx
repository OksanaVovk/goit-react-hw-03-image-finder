import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  handleSearchChange = event => {
    this.setState({ searchWord: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.searchWord) {
      return Notify.info('Please enter search data.');
    }
    this.props.onSubmit(this.state.searchWord);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="form_button">
            <span className="button-label">&#128269;</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchWord}
            onChange={this.handleSearchChange}
          />
        </form>
      </header>
    );
  }
}
