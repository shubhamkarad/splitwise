import { AuthContext } from "../context/authContext";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getGroupDetails } from "service/groupService";

function SelectPayer() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { expenseData } = state;
  const { members } = useContext(AuthContext);
  const [users, setusers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  useEffect(() => {
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const fetchGroupDetails = async () => {
      console.log(storedUser);
      const fetchedDetails = await getGroupDetails(id);
      console.log(fetchedDetails, "Details");
      setusers(fetchedDetails.Users);
      const selectedUserr = fetchedDetails.Users.filter(
        (user) => user.name === storedUser
      );
      const userFound =
        selectedUserr.length > 0
          ? selectedUserr[0].id
          : fetchedDetails.Users[0].id;
      setSelectedUserId(userFound);
      console.log(selectedUser, "Selecteduser");
    };
    fetchGroupDetails();
    setLoading(false);
  }, []);
  const handleCheckboxChange = (userId) => {
    setSelectedUserId(userId);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    // Update expenseData with selected payer
    const updatedExpenseData = { ...expenseData, paidBy: selectedUserId };
    // Submit logic (API call, etc.)
    console.log("Submitting expense with selected payer:", updatedExpenseData);
    navigate(-1);
  };
  return (
    <div>
      {" "}
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center" onClick={() => navigate(-1)}>
              <div>
                <ion-icon name="arrow-back-outline" size="large"></ion-icon>
              </div>
              <div className="mb-1 ml-4 font-medium">Select Payer</div>
            </div>
            <div className="" onClick={handleSubmit}>
              <ion-icon name="checkmark-outline" size="large"></ion-icon>
            </div>
          </div>
          <div>
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Paid By</h1>
              <div className="flex flex-col gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between"
                  >
                    <div className="">
                      <label htmlFor={user.id}>{user.name}</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id={user.id}
                        checked={user.id === selectedUserId}
                        onChange={() => handleCheckboxChange(user.id)}
                        className="mr-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleSubmit}
                >
                  Submit Expense
                </button>
                <button
                  className="ml-2 border bg-transparent px-2 py-2 rounded-lg"
                  onClick={handleBack}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectPayer;
