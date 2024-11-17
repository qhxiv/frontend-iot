import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Home from "./pages/Home/Home.tsx";
import { createContext } from "react";
import { useState } from "react";

const router = createBrowserRouter([
  {
    path: "/frontend-iot",
    element: <Home />,
  },
  {
    path: "/frontend-iot/login",
    element: <Login />,
  },
  {
    path: "/frontend-iot/signup",
    element: <SignUp />,
  },
]);

export const AuthContext = createContext(null);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}
