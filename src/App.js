import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }
  
  addBook = (book) => {
    const currentBooksIds = []
    const {books} = this.state
    books.map((currentBook) => {currentBooksIds.push(currentBook.id)})
    //avoid duplicated adding
    if(currentBooksIds.includes(book.id)){
    //I want to do a api.get to get the book information instead of loop again, however, it seems the setState happens earlies then the get method. Do not know how to wrap the setState inside to each book's api.get. I wrote something like below, but does not work
      //BooksAPI.get(book)
      //  .then((needUpdatedBook) => {
      //     needUpdatedBook.shelf = book.shelf
      //   })
      //
      books.map((currentBook) => {
          if(currentBook.id === book.id){
            currentBook.shelf = book.shelf
          }
      })
      this.setState((currentState) => ({
        books
      }))
    }else{
      this.setState((currentState) => ({
        books: currentState.books.concat([book]),
      }))
    }
    BooksAPI.update(book, book.shelf)
  }
  
  updateBookShelf = (book) => {
    BooksAPI.update(book, book.shelf)
    this.setState((currentState) => ({
      //I updated the book.shelf information in the Book.js, in order to make the listBooks Component refresh, I set states here with the currentState, since inside the currentState.books, the book shelf informaton has changed.
      books: currentState.books
    }))
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            updateBookShelf={(book) => {
              this.updateBookShelf(book)
            }}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            addBook={(book) => {
              this.addBook(book)
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
