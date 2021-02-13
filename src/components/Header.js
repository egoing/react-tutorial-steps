import React from "react";
import {Link} from "react-router-dom";

export default function Header(props) {
  return (
    <header>
      <h1>
        <Link to="/">WEB</Link>
      </h1>
    </header>
  );
}
