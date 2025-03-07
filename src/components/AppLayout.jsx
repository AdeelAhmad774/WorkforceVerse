import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import FirstDiv from "./FirstDiv";
import NavigationBar from "./navigationbar";
import { SecondDiv } from "./SecondDiv";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <NavigationBar />
      <FirstDiv />
      <SecondDiv />
      
    </>
  );
};
