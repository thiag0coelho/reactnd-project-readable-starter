import { generateId } from './utils';

const api = process.env.production || 'http://localhost:3001';

let token = localStorage.token;

if (!token) {
  token = localStorage.token = generateId();
}

const headers = {
  Accept: 'application/json',
  Authorization: token
};

const writeHeaders = {
  ...headers,
  'Content-Type': 'application/json'
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then((resp) => resp.json())
    .then((data) => data.categories);

export const getPosts = (category) => {
  const uri = [api, category, 'posts'].filter((x) => x).join('/');
  return fetch(uri, { headers })
    .then((resp) => resp.json())
    .then((data) => data);
};

export const getPost = (id) => {
  return fetch(`${api}/posts/${id}`, { headers })
    .then((resp) => resp.json())
    .then((data) => data.posts);
};

export const getComments = (id) => {
  return fetch(`${api}/posts/${id}/comments`, { headers }).then((resp) =>
    resp.json()
  );
};

export const createPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: writeHeaders,
    body: JSON.stringify(post)
  })
    .then((res) => res.json())
    .then((data) => data);

export const createComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: writeHeaders,
    body: JSON.stringify(comment)
  })
    .then((res) => res.json())
    .then((data) => data);

export const updatePost = ({ title, body, category, author, id }) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: writeHeaders,
    body: JSON.stringify({ title, body, category, author })
  }).then((res) => res.json());
};

const vote = (id, option, entity) =>
  fetch(`${api}/${entity}s/${id}`, {
    method: 'POST',
    headers: writeHeaders,
    body: JSON.stringify({ option })
  }).then((res) => res.json());

export const upvote = (id, entity = 'post') => vote(id, 'upVote', entity);
export const downvote = (id, entity = 'post') => vote(id, 'downVote', entity);

export const updateComment = ({ id, title, body, author }) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: writeHeaders,
    body: JSON.stringify({ id, title, body, author })
  }).then((res) => res.json());
};

export const updateOrCreateComment = (comment) => {
  if (comment.id) {
    return updateComment(comment);
  }

  return createComment({
    ...comment,
    id: generateId(),
    timestamp: Date.now()
  });
};

export const updateOrCreatePost = (post) => {
  if (post.id) {
    return updatePost(post);
  }

  return createPost({
    ...post,
    id: generateId(),
    timestamp: Date.now()
  });
};

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then((res) => res.json());

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  }).then((res) => res.json());
