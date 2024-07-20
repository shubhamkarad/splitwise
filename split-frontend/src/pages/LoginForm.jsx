import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import React, { useContext, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidation } from "../validations/registerValidations";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:3200/api";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Replace this with your actual API call
      console.log(values);
      const response = await axios.post(`${API_URL}/auth/login`, values);
      toast.success("Login Successful!", { className: "toast-success" });
      const { user, token } = response.data;
      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed!", { className: "toast-error" });
      // Handle error accordingly
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidation}
          onSubmit={handleSubmit}
        >
          {({ errors }) => (
            <>
              <Form>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    id="email"
                    name="email"
                  />
                  {errors.email && (
                    <small className="text-red-500">{errors.email}</small>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="passwrod">Password</Label>
                  <Field
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    id="password"
                    name="password"
                  />
                  {errors.password && (
                    <small className="text-red-500">{errors.password}</small>
                  )}
                </div>
                <Button type="submit" className="mt-4">
                  Login
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
