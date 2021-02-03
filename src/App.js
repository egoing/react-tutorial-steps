import React, { useState, useEffect } from "react";
import "./style.css";
import Article from "./components/Article";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Read from "./components/Read";
import Create from "./components/Create";
import Update from "./components/Update";
import Control from "./components/Control";
import { api_url } from "./Env";

export default function App() {
  var [mode, setMode] = useState("WELCOME");
  var [selectedId, setSelectedId] = useState(null);
  var [topic, setTopic] = useState();
  var [nextId, setNextId] = useState(4);
  var [topics, setTopics] = useState([]);
  useEffect(function() {
    getTopics(setTopics);
  }, []);
  function getTopics() {
    fetch(api_url + "topics")
      .then(function(type) {
        return type.json();
      })
      .then(function(result) {
        setTopics(result);
      });
  }
  var article = null;
  if (mode === "WELCOME") {
    article = <Article title="Welcome" description="Hello, WEB" />;
  } else if (mode === "READ") {
    article = <Read id={selectedId} />;
  } else if (mode === "CREATE") {
    article = (
      <Create
        onCreate={function(data) {
          fetch(api_url + "topics", {
            method: "POST",
            body: JSON.stringify({
              title: data.title,
              description: data.description
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(function(type) {
              return type.json();
            })
            .then(function(result) {
              getTopics(setTopics);
              setSelectedId(result.id);
              setMode("READ");
            });
        }}
      />
    );
  } else if (mode === "UPDATE") {
    var selectedTopic = null;
    for (var i = 0; i < topics.length; i++) {
      if (topics[i].id === selectedId) {
        selectedTopic = topics[i];
        break;
      }
    }
    article = (
      <Update
        id={selectedId}
        onUpdate={function(data) {
          fetch(api_url + "topics/" + data.id, {
            method: "PUT",
            body: JSON.stringify({
              title: data.title,
              description: data.description
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(function(type) {
              return type.json();
            })
            .then(function(result) {
              getTopics();
              setSelectedId(result.id);
              setMode("READ");
            });
        }}
      />
    );
  }
  return (
    <div>
      <Header
        onChangeMode={function() {
          setMode("WELCOME");
          getTopics();
        }}
      />
      <Nav
        data={topics}
        onChangeMode={function(topic_id) {
          setMode("READ");
          setSelectedId(topic_id);
        }}
      />
      {article}
      <Control
        onChangeMode={function(mode) {
          if (mode === "DELETE") {
            fetch(api_url + "topics/" + selectedId, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(function(type) {
                return type.json();
              })
              .then(function(result) {
                setMode("WELCOME");
                getTopics();
              });
          } else {
            setMode(mode);
          }
        }}
      />
    </div>
  );
}
