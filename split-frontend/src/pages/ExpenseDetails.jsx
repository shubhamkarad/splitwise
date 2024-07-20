import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Filter } from "lucide-react";
import { getSingleExpense } from "../service/expenseService";
import { AuthContext } from "context/authContext";

function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInUserInfo } = useContext(AuthContext);
  const [expenses, setExpenses] = useState("");
  useEffect(() => {
    const getDetails = async () => {
      const expenses = await getSingleExpense(id);
      setExpenses(expenses);
      console.log(expenses, "Expense123");
      return expenses;
    };
    getDetails();
    // console.log(expenses, "Expense123");
    // const filteredExpenses = expenses.data.filter(
    //   (expense) => expense.id === id
    // );
    // console.log(filteredExpenses, "Filtrered ");
    // setFilteredExpenses(filteredExpenses);
  }, []);

  if (!expenses) {
    return <div className="text-2xl font-bold">Loading...</div>;
  }

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-2">
        <div onClick={() => navigate(-1)}>
          <ion-icon name="arrow-back-outline" size="large"></ion-icon>
        </div>
        <div className=""></div>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">{expenses.description}</h2>
        <hr />
        <p className="font-semibold text-xl mt-2">₹{expenses.amount}</p>
      </div>
      <div className="mt-4">
        <p className="text-lg mb-2">
          {expenses.paidByUser.name} paid ₹ {expenses.amount}
        </p>
        <hr />
        <ul className="list-disc list-inside mt-2">
          {expenses.ExpenseSplits.map((split) => (
            <li
              key={split.id}
              className="flex items-center justify-around mt-2"
            >
              <div className="flex-1">
                {split?.User?.name === loggedInUserInfo?.name
                  ? "You"
                  : split?.User?.name}
              </div>
              <div className="flex items-center">
                <span className="text-red-500 font-semibold">
                  Owes ₹{split.amount.toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpenseDetails;
