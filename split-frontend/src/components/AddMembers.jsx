// src/components/AddMembers.js

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "date-fns";
import { getGroupDetails } from "../service/groupService";

const AddMembers = () => {
  const { activeGroup, addMemberToGroup, members, groups } =
    useContext(AuthContext);
  const [selectedMembersId, setSelectedMembersId] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [groupMembers, setMembers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const filterAvailableMembers = (allMembers, groupMembers) => {
    const groupMemberIds = groupMembers.map((member) => member.id);
    return allMembers.filter((member) => !groupMemberIds.includes(member.id));
  };

  useEffect(() => {
    const fetchGroupDetails = async () => {
      const fetchedDetails = await getGroupDetails(id);
      setMembers(fetchedDetails.Users);
    };
    fetchGroupDetails();
  }, []);
  const availableMembers = filterAvailableMembers(members, groupMembers);
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (activeGroup && selectedMembersId) {
    console.log(selectedMembersId, "Selected");
    addMemberToGroup(id, selectedMembersId);
    navigate("/groups");
    // }
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedMembersId((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((id) => id !== value)
        : [...prevSelected, value]
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <h2>Add Members to {activeGroup?.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <button
            type="button"
            onClick={toggleDropdown}
            className="bg-gray-200 text-black px-4 py-2 rounded w-full text-left"
          >
            {selectedMembersId.length > 0
              ? `${selectedMembersId.length} members selected`
              : "Select members"}
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-full bg-white border rounded shadow-lg z-10">
              <div className="max-h-60 overflow-y-auto p-2">
                {availableMembers.map((member) => (
                  <label
                    key={member.id}
                    className="flex items-center space-x-2 p-1"
                  >
                    <input
                      type="checkbox"
                      value={member.id}
                      checked={selectedMembersId.includes(member.id)}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>{member.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMembers;
