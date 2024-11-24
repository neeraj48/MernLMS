import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { School } from "lucide-react";
import ModeToggle from "@/DarkMode";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/login");
  };
  return (
    <div className="h-16 dark:bg:[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-10xl max-auto hidden md:flex justify-between items-center gap-8 border-b border-b-gray-300 shadow-lg h-16">
        <div className="flex gap-6 px-20">
          <School size={"30"} />
          <h1 className="font-bold text-xl">MN-Learning</h1>
        </div>
        <div className="flex gap-4 mr-20">
          {true ? (
            <>
              <DropdownMenu className="mr-10">
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>MN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to={"/mylearning"}> My Learning</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex flex-wrap gap-4">
              {/* <Button variant="outline">SignIn</Button> */}
              <Button onClick={handleSignup}>SignUp</Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
