import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import FileStore from "./containers/FileStore";
import AdminPanel from "./containers/AdminPanel";
import CreateEvent from "./EventBooking/AdminEventView/CreateEvent"
import AppliedRoute from "./containers/AppliedRoute";
import UserEventView from "./EventBooking/UserEventView/UserEventView";
import AdminView from "./EventBooking/AdminEventView/AdminView";
import RedirectPage from "./EventBooking/RedirectPage";
import UpdateEvent from "./EventBooking/AdminEventView/UpdateEvent";
import CapturePhoto from "./EventBooking/UserEventView/CapturePhoto";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/FileStore" exact component={FileStore} props={childProps} />
    <AppliedRoute path="/AdminPanel" exact component={AdminPanel} props={childProps} />
    <AppliedRoute path="/CreateEvent" exact component={CreateEvent} props={childProps} />
    <AppliedRoute path="/Redirect" exact component={RedirectPage} props={childProps} />   
    <AppliedRoute path="/UserEventView" exact component={UserEventView} props={childProps} />   
    <AppliedRoute path="/AdminView" exact component={AdminView} props={childProps} />
    <AppliedRoute path="/CreateEvent" exact component={CreateEvent} props={childProps} />
    <AppliedRoute path="/UpdateEvent" exact component={UpdateEvent} props={childProps} />
    <AppliedRoute path="/CapturePhoto" exact component={CapturePhoto} props={childProps} />
  </Switch>;
