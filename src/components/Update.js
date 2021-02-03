import React, { useState, useEffect } from "react";
import { api_url } from "../Env";
export default function Update(props) {
  var [title, setTitle] = useState("");
  var [description, setDescription] = useState("");
  useEffect(
    function() {
      fetch(api_url + "topics/" + props.id)
        .then(function(type) {
          return type.json();
        })
        .then(function(data) {
          setTitle(data.title);
          setDescription(data.description);
        });
    },
    [props.id]
  );
  return (
    <article>
      <h1>Update</h1>
      <form
        action="topics"
        method="put"
        onSubmit={function(e) {
          e.preventDefault();
          props.onUpdate({
            id: props.id,
            title: e.target.title.value,
            description: e.target.description.value
          });
          e.target.reset();
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={function(e) {
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="description"
            placeholder="description"
            value={description}
            onChange={function(e) {
              setDescription(e.target.value);
            }}
          />
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    </article>
  );
}
