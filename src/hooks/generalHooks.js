/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { useState, useEffect } from 'react';

const register = async (inputs) => {
  const baseUrl = 'https://media-new.mw.metropolia.fi/wbma/';
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  const response = await fetch(`${baseUrl}users`, fetchOptions);
  const json = await response.json();
  console.log(json);
  if (json?.user_id) {
    const response1 = login(inputs);
    return response1;
  } if (json.error) {
    console.log('----Duplicate User----');
    return json;
  }
};

/**
 * use Login
 * @param {object} inputs
 * @return {Array} [data,loading]
 */
const login = async (inputs) => {
  const baseUrl = 'https://media-new.mw.metropolia.fi/wbma/';
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  const response = await fetch(`${baseUrl}login`, fetchOptions);
  const json = await response.json();
  console.log(json);
  if (typeof json === 'object' && Object.keys(json).includes('user')) {
    localStorage.setItem('token', json && json.token);
  }
  return json;
};

const checkUserAvailable = async () => {
  const baseUrl = 'https://media-new.mw.metropolia.fi/wbma/';
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  const response = await fetch(`${baseUrl}users/user`, fetchOptions);
  const json = await response.json();
  console.log(json);
  localStorage.setItem('userInfo', JSON.stringify(json));
  if (json && json.message) {
    return null;
  }
  return json;
};

const getSpecificUser = async (userId) => {
  const baseUrl = 'https://media-new.mw.metropolia.fi/wbma/';
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  const response = await fetch(`${baseUrl}users/${userId}`, fetchOptions);
  const json = await response.json();
  console.log(json);
  if (json && json.message) {
    return null;
  }
  return json;
};

function useSingleUserByFile(id, comment) {
  const [data, setData] = useState([]);
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  const baseUrl = 'https://media-new.mw.metropolia.fi/wbma/';
  /**
   * use load media function
   */
  async function loadMedia() {
    const response = await fetch(`${baseUrl}media/${id}`, fetchOptions);
    const json = await response.json();
    let comments = await fetch(`${baseUrl}comments/file/${id}`);
    comments = await comments.json();
    let commentwithUser = [];
    await Promise.all(
      comments.map((item) => fetch(`${baseUrl}users/${item.user_id}`, fetchOptions)
        .then((res) => res.json())
        .then((user) => {
          console.log('--------comment user----------', user);
          return { ...item, ...user };
        }).catch((err) => console.log('err', err))),
    ).then((res) => { commentwithUser = res; });
    let favourites = await fetch(`${baseUrl}favourites/file/${id}`);
    favourites = await favourites.json();
    let ratings = await fetch(`${baseUrl}ratings/file/${id}`);
    ratings = await ratings.json();
    const userofFile = await getSpecificUser(json.user_id);
    console.log('------------all results---------', json, comments, favourites, ratings, userofFile, commentwithUser);
    setData({
      file: json, comments: commentwithUser, favourites, ratings, userofFile,
    });
  }
  useEffect(() => {
    loadMedia();
  }, [comment]);
  return data;
}

function getCurrentUsersFiles() {
  const [data, setData] = useState([]);
  const baseUrl = 'https://media-new.mw.metropolia.fi/wbma/';
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  /**
   * use load media function
   */
  async function loadMedia() {
    const response = await fetch(`${baseUrl}media/user`, fetchOptions);
    const json = await response.json();
    setData(json);
  }
  useEffect(() => {
    loadMedia();
  }, []);
  return data;
}

async function postComment(dataComment) {
  const baseUrl = 'https://media-new.mw.metropolia.fi/wbma/';
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify(dataComment),
  };
  /**
   * use load media function
   */
  const response = await fetch(`${baseUrl}comments`, fetchOptions);
  const json = await response.json();

  return json;
}

export {
  register, login, checkUserAvailable, useSingleUserByFile, getCurrentUsersFiles, postComment,
};
