import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Stack,
  Badge,
} from "react-bootstrap";
import ModalLogin from "./ModalLogin";
import Profile from "../assets/image/Ellipse.png";
import Admin from "../assets/image/Admin.png";
import Cart from "../assets/image/Keranjang.png";
import User from "../assets/image/User.png";
import Logout from "../assets/image/Logout.png";
import Coffe from "../assets/image/Coffe.png";
import ModalRegister from "./ModalRegister";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import "../index.css";

export default function Header() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [UserCarts, SetUserCarts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleShowLogin = () => {
    handleClose(true);
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    handleClose(true);
    setShowRegister(true);
  };

  useQuery("usercartsCache", async () => {
    try {
      const response = await API.get("/carts");
      SetUserCarts(response.data.data);
    } catch (error) {
      return;
    }
  });

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  //DarkMode
  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dark-mode-preference', 'off');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('dark-mode-preference', 'on');
    }
  }
  
  useEffect(() => {
    const darkModePreference = localStorage.getItem('dark-mode-preference');
    const body = document.querySelector('body');
    if (darkModePreference === 'on') {
      body.classList.add('dark-mode');
    }
  }, []);
  
  

  return (
    <>
      <Navbar bg="light shadow -3" expand="lg">
        <Container>
          <Navbar.Brand>
            <NavLink to="/">
              <img src="/image/Icon.png" width="100px" alt="" />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            {state.isLogin === true ? (
              state.user.is_admin === true ? (
                <Nav className="ms-auto gap-3">
                  <NavDropdown align="end"
                    title={
                      <img src={Admin} width="40px" height="40px" alt="" />
                    }
                  >
                    <NavDropdown.Item href="/addproduct">
                      <img src={Coffe} width="20px" height="20px" alt=""></img>
                      <span className="ms-2">Add Product</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/listproduct">
                      <img src={Coffe} width="20px" height="20px" alt=""></img>
                      <span className="ms-2">List Product</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/tableTransaction">
                      <img src={Coffe} width="20px" height="20px" alt=""></img>
                      <span className="ms-2">List Transaction</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                      <img src={Logout} width="20px" height="20px" alt=""></img>
                      <span className="ms-2">Logout</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav className="ms-auto">
                  <NavLink to="/cart" className="position-relative d-inline-flex align-items-center">
                    <div className="me-3">
                      <img src={Cart} width="35px" height="32.26px" alt="" />
                    </div>
                    {UserCarts.filter((cart) => cart.user_id === state.user.id).length > 0 ? (
                    <Badge pill bg="danger" style={{ position: "absolute", top: 20, right: 5 }}>
                    {UserCarts.filter((cart) => cart.user_id === state.user.id).length}
                    </Badge>
                    ) : null}
                  </NavLink>

                  <NavDropdown align="end"
                    title={
                      <img src={Profile} width="40px" height="40px" alt="" />
                    }
                  >
                    <NavDropdown.Item href="/profile">
                      <img src={User} width="20px" height="20px" alt=""></img>
                      <span className="ms-2">Profile</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                      <img src={Logout} width="20px" height="20px" alt=""></img>
                      <span className="ms-2">Logout</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )
            ) : (
              <Nav className="ms-auto">
                <Stack direction="horizontal" gap={3}>
                  <Button onClick={toggleDarkMode} style={{
                      backgroundColor: "#613D2B",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                      border: "2px solid #613D2B",
                    }}
                    size="sm"> {isDarkMode ? 'Light Mode' : 'Dark Mode'}</Button>
                  <Button
                    onClick={handleShowLogin}
                    variant="outline-dark"
                    style={{
                      paddingLeft: "25px",
                      paddingRight: "25px",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                      border: "2px solid",
                    }}
                    size="sm"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={handleShowRegister}
                    style={{
                      backgroundColor: "#613D2B",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      paddingTop: "1px",
                      paddingBottom: "1px",
                      border: "2px solid #613D2B",
                    }}
                    size="sm"
                  >
                    Register
                  </Button>
                </Stack>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin
        show={showLogin}
        onHide={handleClose}
        onClick={handleShowRegister}
      />
      <ModalRegister
        show={showRegister}
        onHide={handleClose}
        onClick={handleShowLogin}
      />
    </>
  );
}
