import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class Search extends Component {
  
  static propTypes = {
    booksOnShelf: PropTypes.array,
    onMoveBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

 queryTimer = null;

  onChangeQuery = (value) => {
      clearTimeout(this.queryTimer);
      
    //Update the query state and wait before executing the search
      this.setState({query: value});
      this.queryTimer = setTimeout(this.updateQuery, 300);
  }

  updateQuery = () => {
      if (this.state.query === "") {
         this.setState({books: []})
      } 
      else {
          BooksAPI.search(this.state.query).then((books) => {
              if (books.error) {
                 books = []
              }

              books.map(book => book.shelf = "none")
              books.map(book => (this.props.booksOnShelf.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))

              this.setState({books})
          })
      }
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
                type="text" 
                value={this.state.query.value}
                placeholder="Search by title or author"
                onChange={(e) => this.onChangeQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.state.books
                  .map(book => (
                    <Book 
                        onMoveBook={this.props.onMoveBook}
                        key={book.id}
                        book={book}
                    />
                  ))
                }
              </ol>
            </div>
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
