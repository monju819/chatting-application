import * as React from "react";

import Registration from "./pages/Registration";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

let router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Registration />}></Route>)
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
