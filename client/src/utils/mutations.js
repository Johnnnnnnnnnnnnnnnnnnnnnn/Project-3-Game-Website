import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THREAD = gql`
  mutation addThread($threadText: String!) {
    addThread(threadText: $threadText) {
      _id
      threadText
      threadAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thId: ID!, $commentText: String!) {
    addComment(threadId: $threadId, commentText: $commentText) {
      _id
      threadText
      threadAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
