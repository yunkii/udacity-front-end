import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import * as BooksAPI from '.././BooksAPI'
import BookItem from './BookItem'
import {Route , Link} from 'react-router-dom'

class SearchBooks extends React.Component {

	static propTypes = {
		changeStatus:PropTypes.func.isRequired,
		currentBooks:PropTypes.array.isRequired,
	}




	render() {
		return (

		<div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
        </div>


		)
	}


}


export default SearchBooks;