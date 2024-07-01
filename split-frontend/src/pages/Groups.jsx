// src/components/GroupsPage.js

import React, { useContext, useEffect, useState } from "react";
import CreateGroup from "../components/CreateGroup";
import AddMembers from "../components/AddMembers";
import { AuthContext } from "../context/authContext";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const LastUpdated = ({ updatedAt }) => {
  const lastUpdated = formatDistanceToNow(new Date(updatedAt), {
    addSuffix: true,
  });
  return <span>{lastUpdated}</span>;
};

const GroupsPage = () => {
  const { activeGroup, groups } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/group/${id}`);
  };

  return (
    <div>
      {groups?.length === 0 ? (
        <CreateGroup />
      ) : (
        <div>
          {/* <div>
            <h1>Your Groups</h1>
            {groups.map((group) => (
              <div key={group.id} classNameName="group-item">
                <h2>{group.name}</h2>
              </div>
            ))}
          </div> */}
          <div className="flex flex-col">
            <h2 className="mb-4 text-2xl font-bold">Your Groups</h2>
            {groups.map((group) => (
              <div
                key={group.id}
                className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <div
                  className="flex items-start rounded-xl bg-white p-4 shadow-lg"
                  onClick={() => handleCardClick(group.id)}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>

                  <div className="ml-4">
                    <h2 className="font-semibold">{group.name}</h2>
                    <p className="mt-2 text-sm text-gray-500">
                      Last updated{" "}
                      <LastUpdated updatedAt={group?.updatedAt || ""} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-16">
            <button
              class="block m-auto  mt-6 rounded-lg border border-primary py-3 px-6 font-sans text-xs font-bold uppercase text-primary transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-dark="true"
            >
              <Link
                to={"/create-group"}
                className="flex items-center justify-center gap-2"
              >
                <div className="text-xs mt-1">
                  <ion-icon name="person-add-outline"></ion-icon>{" "}
                </div>
                Start a new group
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
