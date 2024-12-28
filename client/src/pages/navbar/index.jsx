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
import { useLogoutUserMutation } from "@/feature/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  // const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  console.log(user);
  const navigate = useNavigate();
  const [logutUser, { data: userlogoutData, isSuccess }] =
    useLogoutUserMutation();
  const handleSignup = () => {
    navigate("/login");
  };
  const logoutHandler = async () => {
    await logutUser();
    navigate("/login");
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(userlogoutData?.message || "User logged out");
    }
  }, [userlogoutData, isSuccess]);
  return (
    <div className="h-16 dark:bg:[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="max-w-10xl flex max-auto sm:flex md:flex justify-between items-center gap-8 border-b border-b-gray-300 shadow-lg h-16">
        <div className="flex gap-6 px-20">
          <School size={"30"} />
          <h1 className="font-bold text-xl">
            <Link to="/">MN-Learning</Link>
          </h1>
        </div>
        <div className="flex gap-4 mr-20">
          {user ? (
            <>
              <DropdownMenu className="mr-10">
                <DropdownMenuTrigger asChild>
                  <Avatar className="border-2 border-green-400">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
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
                  <DropdownMenuItem onClick={logoutHandler}>
                    <Link>Logout</Link>
                  </DropdownMenuItem>

                  {user?.role === "admin" ? (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          navigate("/admin/dashboard");
                        }}
                      >
                        <Link>Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  ) : null}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" onClick={handleSignup}>
                SignIn
              </Button>
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
