import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./AppHeader.css";
import { Layout, Menu} from "antd";
const Header = Layout.Header;

class AppHeader extends Component {

  render() {
    let menuItems =  [
        <Menu.Item key="/">
          <Link to="/">Find Paper Category</Link>
        </Menu.Item>,
        <Menu.Item key="/about">
          <Link to="/about">About</Link>
        </Menu.Item>
      ];
  

    return (
      <Header className="app-header">
        <div className="container">
          {/* <div className="app-logo">
            <Link to="/">
              <img src="./image/doc2.jpg" />
            </Link>
          </div> */}
          <div className="app-title">
            <Link to="/">Article Classifier</Link>
          </div>
          <Menu
            className="app-menu"
            mode="horizontal"
            selectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: "64px" }} >
            {menuItems}
          </Menu>
        </div>
      </Header>
    );
  }
}

export default withRouter(AppHeader);
