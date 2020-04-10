import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


class BookShelf extends Component {
  
  static propTypes = {
    selfId: PropTypes.string.isRequired,
    selfName: PropTypes.string.isRequired,
    booksOnShelf: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  render () {
      return (
          <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.selfName}</h2>
              <div className="bookshelf-books">
                  <ol className="books-grid">
                      {this.props.booksOnShelf
                        .filter(book => book.shelf === this.props.selfId)
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
          </div>
      )
  }
  
}

export default BookShelf