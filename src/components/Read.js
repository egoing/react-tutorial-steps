import React, { useState, useEffect } from "react";
import Article from "./Article";
import { api_url } from "../Env";
export default function Read(props) {
  var [topic, setTopic] = useState();
  useEffect(
    function() {
      if (props.id === null) return;
      fetch(api_url + "topics/" + props.id)
        .then(function(type) {
          return type.json();
        })
        .then(function(result) {
          setTopic(result);
        });
    },
    [props.id]
  );
  if (topic) {
    return <Article title={topic.title} description={topic.description} />;
  } else {
    return <>Loading...</>;
  }
}
