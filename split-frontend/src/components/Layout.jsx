import React from "react";
import Header from "../pages/Header";
import Navigation from "./BottomNav";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">{children}</main>
      <footer className="fixed bottom-0">
        <Navigation />
      </footer>
    </>
  );
};

export default Layout;
