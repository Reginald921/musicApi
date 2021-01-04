import React, { useState, useEffect } from "react";
import bandStage from "./images/bandStage.jpg";
import Navbar from "react-bootstrap/Navbar";
import "./styles.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";

const HomePage = () => (
  <div
    className="bg-dim full-bg-size text-center font-32"
    style={{ backgroundImage: `url(${bandStage})` }}
  >
    <h1 className="color-lightblue font-32">Music Api</h1>
    <button>
      <Link to="/disco">Disco</Link>
    </button>
    <button>
      <Link to="/pop">Pop</Link>
    </button>
    <button>
      <Link to="/rap">Rap</Link>
    </button>
    <button>
      <Link to="/country">Country</Link>
    </button>
    <button>
      <Link to="/jazz">Jazz</Link>
    </button>
    <h1 className="color-lightblue">Hackathon</h1>
  </div>
);

const GenrePage = withRouter(({ location }) => {
  const [artists, setArtists] = useState([]);
  const getTopGenreUrl = (genre) => {
    return `https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${genre}&api_key=http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=c26d18f1f771c826838e1596e2a08421&format=json&format=json`;
  };

  const fetchURL = getTopGenreUrl(location.pathname.replace("/", ""));

  useEffect(() => {
    fetch(fetchURL)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(({ topartists: { artist } }) => {
        setArtists(artist);
      });
  }, [fetchURL]);

  return (
    <>
      <div
        className=" full-bg-size "
        style={{ backgroundImage: `url(${bandStage})` }}
      >
        {/* Display Navbar */}
        <Navbar className="bgColor-purple">
          <Navbar.Brand href="/" className="color-lightblue pad-20 font-32">
            Music Api Hackathon{" "}
            <span className="align-right  pad-450" href="/">
              {" "}
              Home{" "}
            </span>
          </Navbar.Brand>
        </Navbar>

        {/* Display Genre */}
        <div className="text-center  color-lightblue font-32">
          {location.pathname.toUpperCase().replace("/", "")}
        </div>

        {/* Display Artist */}
        <div className="Artist-layout">
          {artists.length > 0 ? (
            artists.map((item, index) => (
              <div key={index}>
                <li className="Artist-layout ">
                  <a href={item.url} className="bgColor font-32">
                    {item.name}
                  </a>
                </li>
              </div>
            ))
          ) : (
            <h1>Loading posts...</h1>
          )}
        </div>
      </div>
    </>
  );
});

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:genre" exact component={GenrePage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
}
