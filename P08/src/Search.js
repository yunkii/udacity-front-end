import React from 'react'
import {PropTypes} from 'prop-types'

class Search extends React.Component {

  componentDidMount(){
    console.log('Search function starts');
  }



  state = {
    query: '',
  }


render() {

    return (
                <input role="Search" 
                       aria-labelledby="filter"
                       className='search-input'
                       type='text'
                       placeholder='Enter an attraction'
                       value={this.state.query}
                       onChange={this.updateSearchQuery}/>
	)
}

}

export default Search;