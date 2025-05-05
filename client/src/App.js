import React, { useEffect } from "react";
import "./App.css";
import "./component/utility/transition.css"; // Add this import

import AppRouter from "./AppRouter";

const App = () => {
  return (
    <div>
      <AppRouter />
    </div>
  );
};

export default App;
