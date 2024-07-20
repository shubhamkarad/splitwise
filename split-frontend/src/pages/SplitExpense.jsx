import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { submitExpense } from "../service/expenseService";
import { getGroupDetails } from "../service/groupService";
import { FaCheck } from "react-icons/fa";

function SplitExpense({ expenseData, setExpenseData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setusers] = useState([]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      const fetchedDetails = await getGroupDetails(id);
      console.log(fetchedDetails, "Details");
      setEqualSplits(fetchedDetails.Users);
      setManualSplits(fetchedDetails.Users);
    };
    fetchGroupDetails();
  }, []);

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

  const handleSubmit = async (splitType) => {
    let splits;
    if (splitType === "equally") {
      const includedUsers = equalSplits.filter((user) => user.included);
      console.log(includedUsers, "Includede user");
      // const splitAmount = expenseData.amount / includedUsers.length;
      splits = includedUsers.map((user) => ({
        userId: user.id,
      }));
    } else {
      splits = manualSplits;
    }

    const updatedExpenseData = { ...expenseData, splits, splitType };
    try {
      console.log("first", updatedExpenseData);
      await submitExpense(updatedExpenseData);
    } catch (err) {
      console.log("something went wrong", err);
    }
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
        <Tabs defaultValue="equally">
          <TabsList>
            <TabsTrigger value="equally">Equally</TabsTrigger>
            <TabsTrigger value="manually">Manually</TabsTrigger>
          </TabsList>
          <TabsContent value="equally">
            <div className="grid gap-4 py-4 px-2">
              {equalSplits.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div htmlFor={user.id}>{user.name}</div>
                  <div
                    onClick={() => handleEqualCheckboxChange(user.id)}
                    className="w-6 h-6 border rounded flex items-center justify-center cursor-pointer"
                  >
                    {user.id && <FaCheck />}
                  </div>
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
          <TabsContent value="manually">
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
