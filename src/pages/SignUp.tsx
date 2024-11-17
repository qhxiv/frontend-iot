import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function SignUp() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  function handleSignUpSubmit(e: FormEvent) {
    e.preventDefault();

    if (signUpInfo.password !== signUpInfo.password2) {
      alert("Password not matching");
      setSignUpInfo({ ...signUpInfo, password: "", password2: "" });
      return;
    }

    try {
      axios.post(`${apiUrl}/signup`, signUpInfo).then((res) => {
        if (res.data.success) navigate("/frontend-iot/login");
        else alert(res.data.message);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col min-w-96">
        <form className="flex flex-col" onSubmit={handleSignUpSubmit}>
          <Input
            required
            className="mt-4"
            placeholder="Email"
            type="email"
            value={signUpInfo.email}
            onChange={(e) =>
              setSignUpInfo({ ...signUpInfo, email: e.target.value })
            }
          />
          <Input
            required
            className="mt-4"
            placeholder="Username"
            value={signUpInfo.username}
            onChange={(e) =>
              setSignUpInfo({ ...signUpInfo, username: e.target.value })
            }
          />
          <Input
            required
            className="mt-4"
            placeholder="Password"
            type="password"
            value={signUpInfo.password}
            onChange={(e) =>
              setSignUpInfo({ ...signUpInfo, password: e.target.value })
            }
          />
          <Input
            required
            className="mt-4"
            placeholder="Enter password again"
            type="password"
            value={signUpInfo.password2}
            onChange={(e) =>
              setSignUpInfo({ ...signUpInfo, password2: e.target.value })
            }
          />
          <Button type="submit" className="mt-4">
            Sign up
          </Button>
        </form>

        <div className="flex flex-col mt-4 text-center text-gray-400 select-none">
          <span>
            Already have an account?{" "}
            <Button asChild variant="link">
              <Link to={"/frontend-iot/login"}>Log in</Link>
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
