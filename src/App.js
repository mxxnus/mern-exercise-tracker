import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import IssuesList from "./components/issues-list.component";
import EditIssue from "./components/edit-issue.component";
import CreateIssue from "./components/create-issue.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={IssuesList} />
        <Route path="/edit/:id" component={EditIssue} />
        <Route path="/create" component={CreateIssue} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
