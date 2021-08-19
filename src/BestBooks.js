import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
    componentDidMount = () => {
      axios.get(`http://localhost:3000/books`,
      {params: {
        email: 'booooo',
      }})
      .then(bookResponseData => {
        console.log(bookResponseData);
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
      </div>
      </>
    );
  }
}

export default MyFavoriteBooks;