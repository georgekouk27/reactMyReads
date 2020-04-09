import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Title from './Title'

class BooksApp extends React.Component {
  
  state = {
    books : []
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    const shelves = ["currentlyReading", "wantToRead", "read"]
    const shelveNames = ["Currently Reading", "Want To Read", "Read"]

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Title/>
      		{shelves.map((shelf, index) => {
      			return(
               		<BookShelf
                  	  key={shelves[index]}
                      selfId={shelves[index]}
                      selfName={shelveNames[index]}
                      onMoveBook={this.moveBook}
                      booksOnShelf={this.state.books}
                    />
             	)}
			)}
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
