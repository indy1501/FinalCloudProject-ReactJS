import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import FileStore from "./containers/FileStore";
import AdminPanel from "./containers/AdminPanel";
import CreateEvent from "./containers/CreateEvent"
import AppliedRoute from "./containers/AppliedRoute";
import UserEventView from "./EventBooking/UserEventView/UserEventView";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/FileStore" exact component={FileStore} props={childProps} />
    <AppliedRoute path="/AdminPanel" exact component={AdminPanel} props={childProps} />
    <AppliedRoute path="/CreateEvent" exact component={CreateEvent} props={childProps} />   
    <AppliedRoute path="/UserEventView" exact component={UserEventView} props={childProps} />   

  </Switch>;
