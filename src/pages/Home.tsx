import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Database, Gauge, LogOut, User } from "lucide-react";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <nav className="fixed top-0 bottom-0 left-0 flex flex-col justify-between px-2 py-4">
        <div className="flex flex-col gap-y-4">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="navIcon"
                  onClick={() => navigate("/frontend-iot/dashboard")}
                >
                  <Gauge
                    className={`p-4 ${
                      location.pathname === "/frontend-iot/dashboard"
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

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="navIcon"
                  onClick={() => navigate("/frontend-iot/data")}
                >
                  <Database
                    className={`p-4 ${
                      location.pathname === "/frontend-iot/data"
                        ? "text-primary"
                        : "text-gray-300"
                    }`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="navIcon"
                  onClick={() => navigate("/frontend-iot/profile")}
                >
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
        </div>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="destructiveGhost"
                size="navIcon"
                onClick={() => navigate("/frontend-iot/login")}
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
        <Outlet />
      </div>
    </div>
  );
}
