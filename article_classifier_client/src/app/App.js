import React, { Component } from "react";
import "./App.css";
import { Route, withRouter, Switch } from "react-router-dom";

import Search from "../article/search/Search"
import About from "../article/about/about";
import AppHeader from "../common/AppHeader";
import NotFound from "../common/NotFound";

import { Layout} from "antd";
const { Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="app-container">
        <AppHeader/>

        <Content className="app-content">
          <br/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Search}></Route>
              <Route path="/about" component={About}></Route>
              {/* <Route path="/faq" component={Faq}></Route> */}
              <Route component={NotFound}></Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default withRouter(App);
