import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  // Router 컴포넌트로 App 컴포넌트를 감싼 이유는 App 안에는 useHistory가 있는데, 이것은 Router 내에서 작동하기 때문입니다.
  <Router>
    <App />
  </Router>, document.getElementById("root"));
