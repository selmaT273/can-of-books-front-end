import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Carousel from 'react-bootstrap/Carousel';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";

const backendURL = process.env.REACT_APP_BACKEND_URL;
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
      return axios.get(`${backendURL}`,
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
      <Carousel>
        { this.state.books.length > 0 
          ? this.state.books.map(book => (
            <Carousel.Item key={book._id}>
              <img src="https://via.placeholder.com/1100x500" alt=""/>
              <Carousel.Caption>
                <h3>{book.name}</h3>
                <p>{book.description}</p>
              </Carousel.Caption> 
            </Carousel.Item>)) 
          : <p>'No books to display'</p> 
        }
      </Carousel>
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);