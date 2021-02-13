import React from "react";
import {Link} from "react-router-dom";

export default function Nav(props) {
  var tag = [];
  var d = props.data;
  for (var i = 0; i < d.length; i++) {
    tag.push(
      <li key={d[i].id}>
        <Link
          to={"/read/" + d[i].id}
        >
          {d[i].title}
        </Link>
      </li>
    );
  }
  return (
    <nav>
      <ul>{tag}</ul>
    </nav>
  );
}
