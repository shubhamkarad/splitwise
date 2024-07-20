// src/components/GroupDetails.js

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { getGroupDetails } from "../service/groupService";
import Avatar from "react-avatar";
import { getGroupExpenses } from "../service/expenseService";
import ExpensePage from "./ExpensePage";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const GroupDetails = () => {
  const { id } = useParams();
  const { groups } = useContext(AuthContext);
  //   const [group, setGroup] = useState(null);
  const [group, setGroupDetails] = useState("");
  const [expenses, setExpenseDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // const foundGroup = groups.find((group) => group.id === id);
    // setGroup(foundGroup);
    // useEffect(() => {
    const fetchGroupDetails = async () => {
      const fetchedDetails = await getGroupDetails(id);
      setGroupDetails(fetchedDetails);
      console.log(fetchedDetails, "Details");
    };
    fetchGroupDetails();

    const groupExpenses = async () => {
      const fetchExpenses = await getGroupExpenses(id);
      setExpenseDetails(fetchExpenses);
      console.log(fetchExpenses, "Expenses");
    };
    groupExpenses();
    // }, []);
  }, []);

  if (!group) {
    return <div className="text-2xl font-bold">Loading...</div>;
  }

  return (
    <div className="px-2 h-screen relative">
      <div className="flex items-center justify-between mb-2">
        <div onClick={() => navigate(-1)}>
          <ion-icon name="arrow-back-outline" size="large"></ion-icon>
        </div>
        <div className="">
          <ion-icon name="settings-outline" size="large"></ion-icon>
        </div>
      </div>
      <h2 className="mb-4 text-2xl font-bold">{group.name}</h2>
      {group.Users.length === 0 ? (
        <div>
          <div className="w-fit mx-auto mt-6">
            <Link
              to={`/addMembers/${id}`}
              className="bg-transperent border border-2 flex justify-center space-x-4 px-4 py-2 rounded-xl hover:bg-opacity-30"
            >
              <div className="mt-1">
                <ion-icon name="person-add-outline"></ion-icon>
              </div>
              <div>Add group members</div>
            </Link>
          </div>
          <div className="text-xl font-bold text-center h-[50vh] flex items-center justify-center">
            You're the only one here!
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center">
            {group.Users.map((user, index) => (
              <div className="flex">
                <div
                  key={user.id}
                  className="relative"
                  style={{
                    marginLeft: index !== 0 ? -20 : 0,
                    zIndex: group.Users.length - index,
                  }}
                >
                  <Avatar
                    color={getRandomColor()}
                    name={user.name}
                    size="50"
                    round={true}
                  />
                </div>
                {/* <div>
              <h3 className="text-lg font-bold">{user.name}</h3> */}
                {/* <p className="text-sm text-gray-500">{user.email}</p> */}
                {/* </div> */}
              </div>
            ))}
            <div className="ml-4 bg-light-green px-4 py-2 rounded-full border border-orange-100 border-4">
              <Link
                to={`/addMembers/${id}`}
                className="flex align-items-center justify-center space-x-4"
              >
                <p className="text-3xl">+</p>
              </Link>
            </div>
          </div>
          {expenses?.data?.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-4 h-[400px]">
              <h4 className="text-l font-medium text-center">
                No expenses here yet.
              </h4>
              <p className="text-center mt-3">
                Add an expenses to get this party started.
              </p>
              <div className="bg-arrow_down w-[90px] h-[90px] bg-no-repeat transform rotate-90 scale-y-[1] translate-x-0 translate-y-10"></div>
            </div>
          ) : (
            <ExpensePage expenses={expenses} />
          )}
          <button
            class="fixed  right-10  mt-6 rounded-lg border border-primary py-2 px-4 font-sans text-xs font-bold uppercase text-primary transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-dark="true"
          >
            <Link
              to={"/add-expense/" + id}
              className="flex items-center justify-center gap-2"
            >
              <div className="text-xl mt-1">
                <ion-icon name="wallet-outline"></ion-icon>{" "}
              </div>
              Add Expense
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupDetails;
