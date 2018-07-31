import React from 'react'
import {PropTypes} from 'prop-types'

class BookItem extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    move_to_shelve: PropTypes.func.isRequired,
  }

  moveTo = (e) => {
    this.props.move_to_shelve(e.target.value)
  }

render() {
    const book = this.props.book
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{backgroundImage: `url("${book.imageLinks.thumbnail}")`}}></div>
            <div className="book-shelf-changer">
              <select onChange={this.moveTo} defaultValue={book.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
	)
}

}

export default BookItem;