import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon, { GlobalOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { ReactComponent as AdminSvg } from "./images/admin.svg";
import { ReactComponent as CartSvg } from "./images/cart.svg";
import { ReactComponent as LogoSvg } from "../../images/logo.svg";
import { ReactComponent as Itsonus } from "../../images/itsonus.svg";
import { ReactComponent as ItsonusStacked } from "../../images/itsonusStacked.svg";
import Signout from "../Signout";
import "./style.css";
import firebase from "../../firebaseConfig";

const { Header } = Layout;
const { SubMenu } = Menu;
const auth = firebase.auth();

const NavBar = ({ isTesting }) => {
  const { t } = useTranslation();
  const [userExist, setUserExist] = useState(false);

  const authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserExist(true);
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <>
      <Header className="navbarHeader">
        <div className="logo">
          <LogoSvg />
        </div>
        <div className="navbarTitle">
          <Itsonus />
        </div>
        <div className="navbarStackedTitle">
          <ItsonusStacked />
        </div>
        <Menu
          style={{ background: "#F0B32C" }}
          theme="dark"
          mode={isTesting ? "vertical" : "horizontal"}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1">
            <Link to="/">{t("navbar.headers.header0")}</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/coupons">{t("navbar.headers.header1")}</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/blog">{t("navbar.headers.header2")}</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<GlobalOutlined />}>
            <Menu.Item
              onClick={() => {
                i18next.changeLanguage("tr");
              }}
              key="4"
            >
              {t("navbar.languages.lang0")}
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                i18next.changeLanguage("en");
              }}
              key="5"
            >
              {t("navbar.languages.lang1")}
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                i18next.changeLanguage("ar");
              }}
              key="6"
            >
              {t("navbar.languages.lang2")}
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="7" className="navbarCart">
            <Link to="/cart">
              <Icon style={{ transform: "scale(2)" }} component={CartSvg} />
            </Link>
          </Menu.Item>
          {userExist ? (
            <>
              <Menu.Item key="8" className="navbarAdmin">
                <Link to="/admin">
                  <Icon
                    style={{ transform: "scale(2)" }}
                    component={AdminSvg}
                  />
                </Link>
              </Menu.Item>
              <Menu.Item key="9" className="navbarLogout">
                <Signout setUserExist={setUserExist} />
              </Menu.Item>
            </>
          ) : (
            <Menu.Item key="8" className="navbarAdmin">
              <Link to="/register">
                <Icon style={{ transform: "scale(2)" }} component={AdminSvg} />
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Header>
    </>
  );
};

export default NavBar;
