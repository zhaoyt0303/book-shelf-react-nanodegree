import React, { Component } from 'react'

class Book extends Component {
  
  state = {
    optionValue: ''
  }
  
  handleChange = (event, book, onUpdateShelf) => {
    const optionValue = event.target.value
    if(optionValue === 'currentlyReading'){
      book.shelf = 'currentlyReading'
    }else if(optionValue === 'wantToRead'){
      book.shelf = 'wantToRead'
    }else if(optionValue === 'read'){
      book.shelf = 'read'
    }else if(optionValue === 'none'){
      book.shelf = 'none'
    }
    this.setState(() => ({
      optionValue
    }))
    
    onUpdateShelf(book)
  }
  
  render() {
    const { book, onUpdateShelf } = this.props
    const optionValue  = this.props.book.shelf
    const imageURL = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : null
    const title = book.title
    const authors = book.authors && book.authors.join(' & ')
    
    return (
      <li>
      <div className="book">
       <div className="book-top">
       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageURL})` }}></div>
         <div className="book-shelf-changer">
         <select value={optionValue} onChange={(event) => this.handleChange(event, book, onUpdateShelf)}>
           <option value="move" disabled>Move to...</option>
           <option value="currentlyReading">Currently Reading</option>
           <option value="wantToRead">Want to Read</option>
           <option value="read">Read</option>
           <option value="none">None</option>
         </select>
         </div>
       </div>
       <div className="book-title">{title}</div>
       <div className="book-authors">{authors}</div>
     </div>
     </li>
    )
  }
}

export default Book