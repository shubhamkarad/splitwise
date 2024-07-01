import React, { useContext } from "react";
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
// import BottomNav from "./components/BottomNav";
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
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
            <Route path="/add-expense/:id" element={<AddExpense />} />
            <Route path="/select-payer/:id" element={<SelectPayer />} />
            <Route path="/split-expense/:id" element={<SplitExpense />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
