// src/components/GroupsPage.js

import React, { useContext } from "react";
import CreateGroup from "../components/CreateGroup";
import AddMembers from "../components/AddMembers";
import { AuthContext } from "../context/authContext";

const GroupsPage = () => {
  const { groups, activeGroup } = useContext(AuthContext);

  return (
    <div>
      {groups.length === 0 ? (
        <CreateGroup />
      ) : (
        <div>
          {activeGroup ? (
            <AddMembers />
          ) : (
            <div>
              <h1>Your Groups</h1>
              {groups.map((group) => (
                <div key={group.id} className="group-item">
                  <h2>{group.name}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
