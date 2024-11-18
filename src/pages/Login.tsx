import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const auth = useContext(AuthContext);

  function handleLogInSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      axios
        .post(`${apiUrl}/login`, loginInfo, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            auth.setIsAuthenticated(true);
            navigate("/frontend-iot");
          } else alert(res.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col min-w-96">
        <form className="flex flex-col" onSubmit={handleLogInSubmit}>
          <Input
            required
            className="mt-4"
            placeholder="Username"
            value={loginInfo.username}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, username: e.target.value })
            }
          />
          <Input
            required
            type="password"
            className="mt-4"
            placeholder="Password"
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />

          <Button type="submit" className="mt-4">
            Log in
          </Button>
        </form>

        <div className="flex flex-col mt-4 text-center text-gray-400 select-none">
          {/* <Button asChild variant="link">
            <a href="">Forgot password?</a>
          </Button> */}

          <span>
            Don't have an account?{" "}
            <Button asChild variant="link">
              <Link to={"/frontend-iot/signup"}>Sign up</Link>
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
