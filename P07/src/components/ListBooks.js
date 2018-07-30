import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import Bookshelf from './Bookshelf'
import {Link} from 'react-router-dom'

class ListBooks extends React.Component {

static propTypes = {
  currentBooks:PropTypes.array.isRequired,
  changeStatus:PropTypes.func.isRequired
}

render() {
return (
		<div>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                    <Bookshelf />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
         </div>


	)
}



}


export default ListBooks;