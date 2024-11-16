import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col min-w-96">
        <form className="flex flex-col">
          <Input className="mt-4" placeholder="Email" />
          <Input className="mt-4" placeholder="Username" />
          <Input className="mt-4" placeholder="Password" />
          <Input className="mt-4" placeholder="Enter password again" />
        </form>

        <Button className="mt-4">Sign up</Button>

        <div className="flex flex-col mt-4 text-center text-gray-400 select-none">
          <span>
            Already have an account?{" "}
            <Button asChild variant="link">
              <Link to={"/login"}>Log in</Link>
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
