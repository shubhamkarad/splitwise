import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { AuthContext } from "../context/authContext";
import expenseIcons from "../utils/ExpenseIcons";

function ExpensePage({ expenses }) {
  const navigate = useNavigate();
  const currentMonth = dayjs().format("MMMM YYYY");
  const { loggedInUserInfo } = useContext(AuthContext);
  console.log("expenses", expenses);
  const handleClick = (expenseId) => {
    console.log(expenseId, "ExpenseId");
    navigate(`/expense/${expenseId}`);
  };

  // Function to get a random icon
  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * expenseIcons.length);
    return expenseIcons[randomIndex];
  };

  return (
    <div className="container mx-auto px-0 py-6">
      <h2 className="text-2xl font-bold mb-4">{currentMonth}</h2>
      <ul className="divide-y divide-gray-200">
        {expenses?.data?.map((expense) => (
          <li
            key={expense.id}
            className="py-4"
            onClick={() => handleClick(expense.id)}
          >
            <div className="flex items-center justify-around">
              <div>
                <p className="text-sm text-gray-500">
                  {dayjs(expense.createdAt).format("MMM")}
                </p>
                <p className="text-xl text-gray-500">
                  {dayjs(expense.createdAt).format("DD")}
                </p>
              </div>
              <div className="text-3xl bg-gray-200 p-3 border rounded-lg">
                {getRandomIcon()}
              </div>
              <div>
                <p className="text-lg font-medium">{expense.description}</p>
                <p className="text-sm text-gray-500">
                  {" "}
                  Paid by{" "}
                  {expense.paidByUser.name === loggedInUserInfo.name
                    ? "you"
                    : expense.paidByUser.name}
                </p>
              </div>
              <div>
                {expense.paidByUser.id === loggedInUserInfo?.id ? (
                  <div className="text-green-500 text-right text-lg">
                    <p>You owed</p> <p>₹{expense.amount}</p>
                  </div>
                ) : (
                  <div className="text-red-500">
                    {" "}
                    <p>You borrowed</p> <p>₹{expense.amount}</p>{" "}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpensePage;
