import React, {useState} from "react";

export default function Update(props) {
  var [title, setTitle] = useState(props.data.title);
  var [description, setDescription] = useState(props.data.description);
  return (
    <article>
      <h1>Update</h1>
      <form
        action="topics"
        method="put"
        onSubmit={function (e) {
          e.preventDefault();
          props.onUpdate({
            id: props.data.id,
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
            onChange={function (e) {
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="description"
            placeholder="description"
            value={description}
            onChange={function (e) {
              setDescription(e.target.value);
            }}
          />
        </p>
        <p>
          <input type="submit"/>
        </p>
      </form>
    </article>
  );
}
