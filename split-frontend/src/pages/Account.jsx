import { AuthContext } from "context/authContext";
import React, { useContext, useEffect, useState } from "react";
import { getUserById } from "service/expenseService";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { User, Check, LogOut } from "lucide-react";
import dayjs from "dayjs";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-hot-toast";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

// type CardProps = React.ComponentProps<typeof Card>

function Account() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    console.log(id, "Id");
    const userDetails = async (id) => {
      const user = await getUserById(id);
      setUser(user?.data);
      console.log(user, "User");
      return user?.data;
    };
    userDetails(id);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logout Successful", { className: "toast-success" });
    navigate("/auth");
  };

  return (
    <div className="m-auto">
      <Card className="">
        <CardHeader>
          <CardTitle>My Account</CardTitle>
          <CardDescription>
            Created on {dayjs(user.createdAt).format("DD MMM YYYY")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <User />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Account;
