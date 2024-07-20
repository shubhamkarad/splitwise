import React, { useContext } from "react";
import Header from "../pages/Header";
import Navigation from "./BottomNav";
import { AuthContext } from "../context/authContext";

const Layout = ({ children }) => {
  const isLoggedin = JSON.parse(localStorage.getItem("user"));
  const { user } = useContext(AuthContext);
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">{children}</main>
      {isLoggedin && user && (
        <footer className="fixed bottom-0">
          <Navigation />
        </footer>
      )}
    </>
  );
};

export default Layout;
