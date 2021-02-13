import React from "react";
import {Link, Route} from "react-router-dom";

export default function Control(props) {
  return (
    <ul>
      <li>
        <Link to="/create">create</Link>
      </li>
      <Route path="/read">
        <li>
          <Link to={'/update/' + props.id}>update</Link>
        </li>
        <li>
          <input
            type="button"
            value="delete"
            onClick={function () {
              props.onDelete(props.id);
            }}
          />
        </li>
      </Route>
    </ul>
  );
}
