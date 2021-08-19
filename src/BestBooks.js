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
    const { user } = this.props.auth0;
    axios.get(`http://localhost:3000/books`,
    {params: {
      email: user.email,
    }})
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
      </div>
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);