import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  let pageSize = 6;
  let apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          style={{ height: "3px" }}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                key="general"
                pageSize={pageSize}
                category="general"
                country="in"
                apiKey={apiKey}
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                pageSize={pageSize}
                category="science"
                country="in"
                apiKey={apiKey}
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                pageSize={pageSize}
                category="technology"
                country="in"
                apiKey={apiKey}
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                pageSize={pageSize}
                category="sports"
                country="in"
                apiKey={apiKey}
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                pageSize={pageSize}
                category="business"
                country="in"
                apiKey={apiKey}
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                pageSize={pageSize}
                key="entertainment"
                category="entertainment"
                country="in"
                apiKey={apiKey}
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                pageSize={pageSize}
                category="health"
                country="in"
                apiKey={apiKey}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
