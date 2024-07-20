import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/authContext";
import Authpage from "./pages/Authpage";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Groups from "./pages/Groups";
import Activity from "./pages/Activity";
import Friends from "./pages/Friends";
import Account from "./pages/Account";
import AddMembers from "./components/AddMembers";
import CreateGroup from "./components/CreateGroup";
import GroupDetails from "./pages/GroupDetails";
import AddExpense from "./pages/AddExpense";
import SelectPayer from "./pages/SelectPayer";
import SplitExpense from "./pages/SplitExpense";
import ExpenseDetails from "./pages/ExpenseDetails";
import Loader from "./components/loader/Loader";
import { LoadingContext, LoadingProvider } from "./context/LoadingContext";
import { Toaster } from "react-hot-toast";
// import BottomNav from "./components/BottomNav";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = localStorage.getItem("user");
  return user && isLoggedIn ? children : <Navigate to="/auth" />;
};

function App() {
  // const { loggedInUserInfo } = useContext(AuthContext);

  const [expenseData, setExpenseData] = useState({
    amount: 0,
    description: "",
    paidBy: "",
    splitType: "equally",
    splits: [],
  });
  // const loadingContext = useContext(LoadingContext);
  // const { isLoading, setIsLoading } = loadingContext;
  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
          <Layout>
            {/* {isLoading && <Loader />} */}
            <Toaster position="bottom-center" reverseOrder={false} />
            <Routes>
              <Route path="/auth" element={<Authpage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/addMembers/:id" element={<AddMembers />} />
              <Route path="/create-group" element={<CreateGroup />} />
              <Route path="/group/:id" element={<GroupDetails />} />
              <Route path="/expense/:id" element={<ExpenseDetails />} />
              <Route
                path="/add-expense/:id"
                element={
                  <AddExpense
                    expenseData={expenseData}
                    setExpenseData={setExpenseData}
                  />
                }
              />
              <Route
                path="/select-payer/:id"
                element={
                  <SelectPayer
                    expenseData={expenseData}
                    setExpenseData={setExpenseData}
                  />
                }
              />
              <Route
                path="/split-expense/:id"
                element={
                  <SplitExpense
                    expenseData={expenseData}
                    setExpenseData={setExpenseData}
                  />
                }
              />
              <Route path="/friends" element={<Friends />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </Layout>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
