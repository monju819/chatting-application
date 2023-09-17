import Registration from "./pages/Registration";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import RootLayout from "./components/RootLayout";
import Massage from "./pages/Massage";
import Notification from "./pages/Notification";
let router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/message" element={<Massage />} />
        <Route path="/notification" element={<Notification />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
