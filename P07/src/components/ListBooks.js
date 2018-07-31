import React from 'react'
import {PropTypes} from 'prop-types'
import Bookshelf from './Bookshelf'
import {Link} from 'react-router-dom'

class ListBooks extends React.Component {

static propTypes = {
    books: PropTypes.array.isRequired,
    moveTo: PropTypes.func.isRequired
}

render() {
      console.log(this.props.books.length);
return (
		<div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          <p>An Udacity FEND project using React</p>
        </div>
        <div className="list-books-content">

          <Bookshelf 
            title="Currently Reading" 
            moveToShelve={this.props.moveTo} 
            books={this.props.books.filter((book) => (book.shelf === "currentlyReading"))}
           />

          <Bookshelf 
            title="Want to Read" 
            moveToShelve={this.props.moveTo} 
            books={this.props.books.filter((book) => (book.shelf === "wantToRead"))} 
          />

          <Bookshelf 
            title="Read" 
            moveToShelve={this.props.moveTo} 
            books={this.props.books.filter((book) => (book.shelf === "read"))}
          />
          
        </div>
        <div className="open-search">
          <Link to="/search">Find a book</Link>
        </div>
      </div>
    </div>
	)
}



}


export default ListBooks;