/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const newOnCreatePost = /* GraphQL */ `
  subscription NewOnCreatePost {
    newOnCreatePost {
      id
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
      id
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
      id
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
      id
      content
      owner
      createdAt
      updatedAt
    }
  }
`;
