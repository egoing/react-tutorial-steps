import React from "react";

export default function Create(props) {
  return (
    <article>
      <h1>Create</h1>
      <form
        action="topics"
        method="post"
        onSubmit={function (e) {
          e.preventDefault();
          props.onCreate({
            title: e.target.title.value,
            description: e.target.description.value
          });
          e.target.reset();
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"/>
        </p>
        <p>
          <textarea name="description" placeholder="description"/>
        </p>
        <p>
          <input type="submit"/>
        </p>
      </form>
    </article>
  );
}
