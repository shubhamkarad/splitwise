import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SplitExpense() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { expenseData } = state;

  // Simulated list of users, replace with actual data or fetch from API
  const users = [
    { id: "1", name: "User 1" },
    { id: "2", name: "User 2" },
    { id: "3", name: "User 3" },
    { id: "4", name: "User 4" },
  ];

  const [equalSplits, setEqualSplits] = useState(
    users.map((user) => ({
      ...user,
      included: true,
    }))
  );

  const [manualSplits, setManualSplits] = useState(
    users.map((user) => ({
      ...user,
      amount: 0,
    }))
  );

  const handleEqualCheckboxChange = (userId) => {
    setEqualSplits(
      equalSplits.map((user) =>
        user.id === userId ? { ...user, included: !user.included } : user
      )
    );
  };

  const handleManualAmountChange = (userId, amount) => {
    setManualSplits(
      manualSplits.map((user) =>
        user.id === userId ? { ...user, amount: parseFloat(amount) } : user
      )
    );
  };

  const handleSubmit = (splitType) => {
    let splits;
    if (splitType === "equally") {
      const includedUsers = equalSplits.filter((user) => user.included);
      const splitAmount = expenseData.amount / includedUsers.length;
      splits = includedUsers.map((user) => ({
        userId: user.id,
        amount: splitAmount,
      }));
    } else {
      splits = manualSplits;
    }

    const updatedExpenseData = { ...expenseData, splits, splitType };
    // Submit logic (API call, etc.)
    console.log("Submitting expense with splits:", updatedExpenseData);
    navigate("/");
  };
  return (
    <div>
      {" "}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center" onClick={() => navigate(-1)}>
          <div>
            <ion-icon name="arrow-back-outline" size="large"></ion-icon>
          </div>
          <div className="mb-1 ml-4 font-medium">Split expense</div>
        </div>
        <div className="">
          <ion-icon name="checkmark-outline" size="large"></ion-icon>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Split Expense</h1>
        <Tabs>
          <TabsList>
            <TabsTrigger>Equally</TabsTrigger>
            <TabsTrigger>Manually</TabsTrigger>
          </TabsList>
          <TabsContent>
            <div className="grid grid-cols-2 gap-4">
              {equalSplits.map((user) => (
                <div key={user.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={user.id}
                    checked={user.included}
                    onChange={() => handleEqualCheckboxChange(user.id)}
                    className="mr-2"
                  />
                  <label htmlFor={user.id}>{user.name}</label>
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleSubmit("equally")}
            >
              Submit Equal Split
            </button>
          </TabsContent>
          <TabsContent>
            <div className="grid grid-cols-1 gap-4">
              {manualSplits.map((user) => (
                <div key={user.id} className="flex items-center">
                  <label htmlFor={`amount-${user.id}`} className="mr-2">
                    {user.name}
                  </label>
                  <input
                    type="number"
                    id={`amount-${user.id}`}
                    value={user.amount}
                    onChange={(e) =>
                      handleManualAmountChange(user.id, e.target.value)
                    }
                    className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Amount"
                  />
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleSubmit("manually")}
            >
              Submit Manual Split
            </button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default SplitExpense;
