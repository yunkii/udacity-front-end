import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
class Search extends React.Component {
    static propTypes = {
        locations: PropTypes.array.isRequired,
        query: PropTypes.string.isRequired
    }

    state = {
        query: ''
    }

    // Update query everytime user enter the character.
    updateQuery = (query) => {
        if (query) {
          const match = new RegExp(escapeRegExp(query),'i')
          this.props.filteredLocations = this.props.locations.filter((location)=> match.test(location.name))
        } else {
          this.props.filteredLocations = this.props.locations;
        }
    }

    render() {
        return (
                <input 
                role="Search" 
                aria-label="search location" 
                className='search-input'
                type='text'
                placeholder='Enter an attraction'
                value={this.state.query}
                onChange={(event => this.updateQuery(event.target.value))}
                />
            )
    }
}

export default Search;