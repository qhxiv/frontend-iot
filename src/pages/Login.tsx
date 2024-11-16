import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col min-w-96">
        <form className="flex flex-col">
          <Input className="mt-4" placeholder="Username" />
          <Input className="mt-4" placeholder="Password" />
        </form>

        <Button asChild className="mt-4">
          <Link to={"/frontend-iot/dashboard"}>Log in</Link>
        </Button>

        <div className="flex flex-col mt-4 text-center text-gray-400 select-none">
          <Button asChild variant="link">
            <a href="">Forgot password?</a>
          </Button>

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
