import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  handleSearchChange = event => {
    event.preventDefault();
    this.setState({ searchWord: event.currentTrget.value.toLowerCase() });
  };

  render() {
    return (
      <header class="searchbar">
        <form class="form">
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.searchWord}
            onChange={this.handleSearchChange}
          />
        </form>
      </header>
    );
  }
}
