import {useState, useEffect} from 'react';

export default function UserInfo(id) {
  const [data, setData] = useState([]);
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  async function loadMedia() {
    const response = await fetch(
      `https://media-new.mw.metropolia.fi/wbma/user/${id}`,
      fetchOptions
    );
    const json = await response.json();
    setData(json);
  }
  useEffect(() => {
    loadMedia();
  }, []);
  return data;
}
