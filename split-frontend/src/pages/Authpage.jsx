import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Finance from "../assets/Finance.svg";

const Authpage = () => {
  return (
    <div className="container my-[15%] mx-auto p-4 w-auto h-auto">
      <Tabs defaultValue="login" className="w-auto">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
      <div className="relative w-full h-full">
        <img
          src={Finance}
          alt="Finance"
          className="absolute top-0 left-0 object-cover"
        />
      </div>
    </div>
  );
};

export default Authpage;
