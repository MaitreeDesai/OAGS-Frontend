import React, { useState, useEffect } from "react";
import { TopNavBar } from "../components/TopNavbar";
import { NavBar } from "../components/Navbar";
import { Footer } from "../components/Footer";

 
export const UserLayout = (props) => {
   const [topHeaderClass, setTopHeaderClass] = useState("show");
 
   useEffect(() => {
     const handleScroll = () => {
       if (window.scrollY >= 50) {
         setTopHeaderClass("hide");
       } else {
         setTopHeaderClass("show");
       }
     };
 
     window.scrollTo(0, 0);
     window.addEventListener("scroll", handleScroll);
 
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);
 
   return (
     <div className="main-wrapper">
       <div className="super_container">
         <header className="header trans_300">
           <NavBar />
         </header>
         <div className="layout-Container">{props.children}</div>
           <Footer />
       </div>
     </div>
   );
 };