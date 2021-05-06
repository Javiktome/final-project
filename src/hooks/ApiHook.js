export default async function getAllMedia(start, limit) {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(
    `https://media-new.mw.metropolia.fi/wbma/media?start=${start}&limit=${limit}`, fetchOptions,
  );
  const json = await response.json();
  return json;
}
