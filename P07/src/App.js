import React , {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'

class BooksApp extends React.Component {
  state = {
    CurrentBooks:[],
    // showSearchPage: false
  }

  fetchData = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({CurrentBooks: books})
    })
  }

  refreshData = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fetchData()
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks/>)
        }/>
        
        <Route path="/search" render={() =>(
          <SearchBooks/>)
        }/>
      </div>
    )
  }
}

export default BooksApp
