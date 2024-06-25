// src/components/AddMembers.js

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const AddMembers = () => {
  const { activeGroup, addMemberToGroup, members } = useContext(AuthContext);
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeGroup && selectedMemberId) {
      addMemberToGroup(activeGroup.id, selectedMemberId);
      setSelectedMemberId("");
    }
  };

  return (
    <div>
      <h2>Add Members to {activeGroup?.name}</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedMemberId}
          onChange={(e) => setSelectedMemberId(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a member
          </option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddMembers;
