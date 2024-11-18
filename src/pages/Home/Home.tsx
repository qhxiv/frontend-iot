import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Gauge, LogOut, User } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Dashboard from "./Dashboard";
import Profile from "./Profile";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  useEffect(() => {
    let ignore = false;

    try {
      if (!ignore)
        axios.get(`${apiUrl}/verify`, { withCredentials: true }).then((res) => {
          if (res.data.success) {
            auth.setIsAuthenticated(true);
          } else {
            navigate("/frontend-iot/login");
            auth.setIsAuthenticated(false);
          }
        });
    } catch (error) {
      console.log(error);
    }

    return () => {
      ignore = true;
    };
  }, [apiUrl, auth, navigate]);

  function handleLogOut() {
    try {
      axios.get(`${apiUrl}/logout`, { withCredentials: true }).then((res) => {
        console.log(res);
        navigate("/frontend-iot/login");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <nav className="fixed top-0 bottom-0 left-0 flex flex-col justify-between px-2 py-4">
          <div className="flex flex-col gap-y-4">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="navIcon">
                    <Gauge
                      className={`p-4 ${
                        location.pathname === "/frontend-iot"
                          ? "text-primary"
                          : "text-gray-300"
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Popover>
              <PopoverTrigger>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="ghost" size="navIcon">
                        <User
                          className={`p-4 ${
                            location.pathname === "/frontend-iot/profile"
                              ? "text-primary"
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </PopoverTrigger>

              <PopoverContent side="left" align="start">
                <Profile />
              </PopoverContent>
            </Popover>
          </div>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="destructiveGhost"
                  size="navIcon"
                  onClick={handleLogOut}
                >
                  <LogOut className="p-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <div className="max-w-screen-lg bg-white border shadow-md border-border rounded-3xl">
          <Dashboard />
        </div>
      </div>
    </>
  );
}
