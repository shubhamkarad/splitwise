// src/components/CreateGroup.js

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const CreateGroup = () => {
  const { createGroup } = useContext(AuthContext);
  const [groupName, setGroupName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createGroup({ name: groupName });
    setGroupName("");
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
