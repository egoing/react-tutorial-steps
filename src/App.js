import React, {useState} from "react";
import "./style.css";
import Article from "./components/Article";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Create from "./components/Create";
import Update from "./components/Update";
import Control from "./components/Control";
import {Route, Switch, useHistory} from "react-router-dom";

export default function App() {
  var [nextId, setNextId] = useState(4);
  var [topics, setTopics] = useState([
    { id: 1, title: "html", description: "html is..." },
    { id: 2, title: "css", description: "css is..." },
    { id: 3, title: "js", description: "js is..." }
  ]);
  var history = useHistory();
  return (
      <div>
        {/*Header, Nav의 경우 이벤트 핸들러 대신 Link 방식으로 변경했습니다. 이렇게 되면 Header, Nav의 경우 App과 강하게 결합되기 때문에 부품으로서의 효용이 떨어지게 됩니다.*/}
        <Header/>
        <Nav
          data={topics}
        />
        <Switch>
          <Route path="/read/:id" render={function(match){
            var id = Number(match.match.params.id);
            for (var i = 0; i < topics.length; i++) {
              if (topics[i].id === id) {
                var title = topics[i].title;
                var description = topics[i].description;
                return <Article title={title} description={description}></Article>
              }
            }
          }}>
          </Route>
          <Route path="/update/:id" render={function(match){
            var id = Number(match.match.params.id);
            for (var i = 0; i < topics.length; i++) {
              if (topics[i].id === id) {
                var title = topics[i].title;
                var description = topics[i].description;
                return (
                  <Update
                    data={{title:title, description:description}}
                    onUpdate={function(data) {
                      var newTopics = [...topics];
                      for (var i = 0; i < newTopics.length; i++) {
                        if (newTopics[i].id === id) {
                          newTopics[i].title = data.title;
                          newTopics[i].description = data.description;
                          break;
                        }
                      }
                      setTopics(newTopics);
                      history.push('/read/'+id);
                    }}
                  />
                );
              }
            }
          }}>
          </Route>
          <Route path="/create">
            <Create
              onCreate={function(data) {
                data.id = nextId;
                setTopics([...topics, data]);
                setNextId(nextId + 1);
                history.push('/read/'+data.id);
              }}
            />
          </Route>
          <Route path="/">
            <Article title="Welcome" description="Hello, WEB" />
          </Route>
        </Switch>
        <Route path="/:mode?/:id?" render={function(match){
          var id = Number(match.match.params.id);
          return <Control
            id={id}
            onDelete={function(id) {
              var newTopics = [];
              for (var i = 0; i < topics.length; i++) {
                if (topics[i].id === id) {
                  continue;
                } else {
                  newTopics.push(topics[i]);
                }
              }
              setTopics(newTopics);
              history.push('/');
            }}
          />
        }}>
        </Route>
      </div>
  );
}
