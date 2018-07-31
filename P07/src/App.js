import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import './spinners.css'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    // showSearchPage: false
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        myBooks: books,
      })
    })
  }

  updateAllBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks()
    })
  }


  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    console.log(this.state);
    return (


      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.myBooks} moveTo={this.updateAllBooks} />)
        }/>

        
        <Route path="/search" render={() =>(
          <SearchBooks BooksOnShelves={this.state.myBooks} moveTo={this.updateAllBooks}/>)
        }/>
      </div>
    )
  }
}

export default BooksApp
