import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class BookItem extends Component {

  static propTypes = {
    bookItem: PropTypes.object.isRequired,
    changeStatus: PropTypes.func.isRequired
  }

  changeStatus = (c) => {
    this.props.changeStatus(c.target.value)
  }

render() {
	return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{backgroundImage: `url("${this.props.bookItem.imageLinks.thumbnail}")`}}></div>
            <div className="book-shelf-changer">
              <select onChange={this.changeStatus} value={this.props.bookItem.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.bookItem.title}</div>
          <div className="book-authors">{this.props.bookItem.authors}</div>
        </div>
      </li>
	)
}

}


export default BookItem;