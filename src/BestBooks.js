import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
    }
  }
  componentDidMount = () => {
    this.props.auth0.getIdTokenClaims()
    .then(tokenRes => {
      const jwt = tokenRes.__raw;
      console.log(jwt);
      const { user } = this.props.auth0;
      return axios.get(`http://localhost:3000/books`,
      {
        params: {email: user.email},
        headers: {"Authorization" : `Bearer ${jwt}`}
      })
    })
    .then(bookResponseData => {
      this.setState({
        books: bookResponseData.data[0].books,
      })
      console.log('this is books state', this.state.books);
    })
    .catch(err => console.log(err.message));
  }
  render() {
    return(
      <>
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
      <div>
        {this.state.books.length > 0 ? this.state.books.map(book => (<p key={book._id}>{book.name} <br/> {book.description} </p>)) : <p>'No books to display'</p>}
      </div>
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);