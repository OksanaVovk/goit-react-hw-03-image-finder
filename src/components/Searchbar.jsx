import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  handleSearchChange = event => {
    this.setState({ searchWord: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchWord);
    this.setState({ searchWord: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="form_button">
            <span className="button-label">Search</span>
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
