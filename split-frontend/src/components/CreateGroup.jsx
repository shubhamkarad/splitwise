// src/components/CreateGroup.js

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const { createGroup, fetchMembers } = useContext(AuthContext);
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      createGroup({ name: groupName });
      setGroupName("");
      navigate("/addMembers");
    } catch (err) {
      console.log("something went wrong");
    }
  };

  return (
    <div>
      <h2>Create a New Group</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group Name"
          required
        />
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
};

export default CreateGroup;
