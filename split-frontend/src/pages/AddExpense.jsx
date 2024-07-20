import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { AuthContext } from "../context/authContext";
import { getGroupDetails } from "service/groupService";
function AddExpense({ expenseData, setExpenseData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { loggedInUserInfo } = useContext(AuthContext);
  // const [expenseData, setExpenseData] = useState({
  //   amount: parseFloat(amount),
  //   description,
  //   groupId: id,
  //   paidBy: loggedInUserInfo.id,
  //   splitType: "equally",
  //   splits: [],
  // });
  const handleNext = () => {
    setExpenseData({
      ...expenseData,
      amount: parseFloat(amount),
      description,
      groupId: id,
      paidBy: loggedInUserInfo.id,
      splitType: "equally",
      splits: [],
    });
    navigate(`/select-payer/${id}`);
  };

  const handleSplitEqually = () => {
    setExpenseData({
      ...expenseData,
      amount: parseFloat(amount),
      description,
      groupId: id,
      paidBy: loggedInUserInfo.id,
      splitType: "equally",
      splits: [],
    });
    navigate(`/split-expense/${id}`);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center" onClick={() => navigate(-1)}>
          <div>
            <ion-icon name="arrow-back-outline" size="large"></ion-icon>
          </div>
          <div className="mb-1 ml-4 font-medium">Add expense</div>
        </div>
        <div className="">
          <ion-icon name="checkmark-outline" size="large"></ion-icon>
        </div>
      </div>
      <div className="">
        <div className="flex items-center">
          With you and:{" "}
          <div className="ml-2 px-3 py-2 border-2 bg-transperent rounded-full">
            All of Travel
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="flex items-center">
          <div className="mr-4 px-3 py-3 bg-light-grey border text-3xl rounded-lg">
            <TbFileDescription />
          </div>
          <div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-b-2 border-gray-300 focus:border-red-500 focus:outline-none py-2 px-2 text-lg"
              placeholder="Enter a description"
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <div className="mr-4 px-4 py-4 text-2xl bg-light-grey border rounded-lg">
            <FaRupeeSign />
          </div>
          <div>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-b-2 border-gray-300 focus:border-red-500 focus:outline-none py-2 px-2 text-lg"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        Paid By
        <button
          className="ml-2 border bg-transperent px-2 py-2 rounded-lg"
          onClick={handleNext}
        >
          {loggedInUserInfo.id === expenseData?.paidBy
            ? "You"
            : expenseData.paidBy}
        </button>{" "}
        and split{" "}
        <button
          onClick={handleSplitEqually}
          className="ml-2 border bg-transperent px-2 py-2 rounded-lg"
        >
          Eqaually
        </button>
      </div>
    </div>
  );
}

export default AddExpense;
