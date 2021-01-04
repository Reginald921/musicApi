import { useState, useEffect } from "react";

export default function useFetch("https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=country&api_key=http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=c26d18f1f771c826838e1596e2a08421&format=json&format=json") {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
    console.log(data)
  }, []);

  return data;
}
