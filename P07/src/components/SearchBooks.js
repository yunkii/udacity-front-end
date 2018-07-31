import React from 'react'
import {PropTypes} from 'prop-types'
import * as BooksAPI from '.././BooksAPI'
import BookItem from './BookItem'
import {Link} from 'react-router-dom'

class SearchBooks extends React.Component {

  componentDidMount(){
    console.log('Search function starts');
  }

	static propTypes = {
	    moveTo: PropTypes.func.isRequired,
	    BooksOnShelves: PropTypes.array.isRequired,
	}

	state = {
		allBooks:[],
		query: '',
	}


  updateQuery = (event) => {
    let val = event.target.value
    this.setState(() => {
      return {query: val}
    })
    this.searchBooks(val)
  }


  searchBooks = (val) => {
    if (val.length !== 0) {
      BooksAPI.search(val, 10).then((books) => {
        if (books.length > 0) {
          books = books.filter((book) => (book.imageLinks))
          books = this.changeShelf(books)
          this.setState(() => {
            return {allBooks: books}
          })
        }
      })
    } else {
      this.setState({
        allBooks: [], 
        query: ''
      })
    }
  }

  changeShelf = (books) => {
    for (let book of books) {
      book.shelf = "none"
    }

    for (let book of books) {
      for (let b of this.props.BooksOnShelves) {
        if (b.id === book.id) {
          book.shelf = b.shelf
        }
      }
    }
    return books
  }

	render() {
		return (

    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.updateQuery}/>
        </div>
      </div>
      <div className="search-books-results">
       {this.state.query.length === 0 && <p>Start Searching!</p>}
       {this.state.query.length > 0 && this.state.allBooks.length !== 0 && <p>Found {this.state.allBooks.length} Books</p>}
       <div className="loader">
       {this.state.query.length > 0 && this.state.allBooks.length === 0 && <div className="three-quarters-loader">Loading...</div>}
       </div>
       
        <ol className="books-grid">
          {this.state.query.length > 0 && this.state.allBooks.map((book, index) => (
            <BookItem
            book={book}
            key={index}
            move_to_shelve={(shelf) => {
            this.props.moveTo(book, shelf)}}
            />
          ))}
        </ol>
      </div>
    </div>
		)
	}


}


export default SearchBooks;