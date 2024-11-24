import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/feature/api/authApi.js";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [signUpInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signinInput, setSigninInput] = useState({
    email: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: regData,
      error: regError,
      isLoading: regIsLoading,
      isSuccess: regIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const changeInuputHandler = (e, type) => {
    const { id, value } = e.target;
    if (type == "signup") {
      setSignupInput({ ...signUpInput, [id]: value });
    } else {
      setSigninInput({ ...signinInput, [id]: value });
    }
  };
  const handleRegistration = async (type) => {
    const inputData = type === "singup" ? signUpInput : signinInput;
    const action = type === "singup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (regIsSuccess && regData) {
      toast.success(regData?.message || "Signup success");
      setSignupInput({
        name: "",
        email: "",
        password: "",
      });
    }
    if (regError) {
      toast.error(regData?.message || "Signup failled");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData?.message || "Signup success");
      setSigninInput({
        email: "",
        password: "",
      });
      navigate("/");
    }
    if (loginError) {
      toast.error(loginData?.message || "Signup failled");
    }
  }, [regIsLoading, loginIsLoading, regData, loginData, regError, loginError]);

  return (
    <Tabs defaultValue="account" className="w-[400px] m-auto mt-20">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">SignUp</TabsTrigger>
        <TabsTrigger value="signIn">SignIn</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                type="text"
                required={true}
                value={signUpInput.name}
                onChange={(e) => changeInuputHandler(e, "signup")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter email"
                type="email"
                value={signUpInput.email}
                required={true}
                onChange={(e) => changeInuputHandler(e, "signup")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter password"
                type="password"
                value={signUpInput.password}
                required={true}
                onChange={(e) => changeInuputHandler(e, "signup")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleRegistration("singup")}>
              {regIsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "SigUp"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signIn">
        <Card>
          <CardHeader>
            <CardTitle>SignIn</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required={true}
                placeholder="Enter email"
                value={signinInput.email}
                onChange={(e) => changeInuputHandler(e, "signin")}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                required={true}
                placeholder="Enter Password"
                value={signinInput.password}
                onChange={(e) => changeInuputHandler(e, "signin")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleRegistration("signin")}>
              {loginIsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "SigIn"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LoginPage;
