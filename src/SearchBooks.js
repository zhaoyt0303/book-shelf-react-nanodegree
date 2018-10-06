import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    shownSearchResultBooks: []
  }
  
  setShelfForBooks = (shownSearchResultBooks, books)=>{
    const currentBooksIds = []
    books.map((book) => {currentBooksIds.push(book.id)})
    shownSearchResultBooks.map((searchbook) => {
      if(currentBooksIds.includes(searchbook.id)){
        books.map((book) => {
          if(searchbook.id === book.id){
            searchbook.shelf = book.shelf
          }
        })
      }else{
        searchbook.shelf = 'none'
      }
    })
    this.setState({ shownSearchResultBooks})
  }

  updateQuery = (query, books) => {
    if (query.trim()) {
      BooksAPI.search(query, 20)
      .then((shownSearchResultBooks) => {
        this.setShelfForBooks(shownSearchResultBooks, books)
      })
    }else{
      this.setState({ shownSearchResultBooks: [] })
    }
  }
            
  updateShelf = (book)=>{
   if (this.props.addBook) {
      this.props.addBook(book)
    }
  }
  
  render() {
    const { shownSearchResultBooks } = this.state
    const { books } = this.props
    return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          <input className='search-books' type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value, books)}/>
        </div>
      </div>
      {shownSearchResultBooks.length > 0 ? (
        <div className="search-books-results">
        <ol className="books-grid">
		  {shownSearchResultBooks.length>0 && shownSearchResultBooks.map((book) => (
            <Book key={book.id}
                  book={book}
                  onUpdateShelf={this.updateShelf}/>
           ))}
        </ol>
        </div>
      ) : null}
    </div>
    )
  }
}

export default SearchBooks