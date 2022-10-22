import React, { useEffect, useState } from "react";
import { getUser } from "../api/getUser";
import UserItem from "../components/User/UserItem";
import Card from "@mui/material/Card";

type Props = {};

const Members = (props: Props) => {
  const [members, setMembers] = useState([]);
  const getUsers = async () => {
    const res = await getUser().getUserList();
    setMembers(res?.data?.content || []);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1>Members List</h1>
      <Card variant="outlined">
        <div className="flex flex-row justify-between items-center px-5">
          <p className="w-1/6">ID</p>
          <p className="w-1/3">Name</p>
          <p className="w-1/4">Phone</p>
          <p className="w-1/4">ID</p>
        </div>
      </Card>

      {members?.map((member) => (
        <UserItem user={member} key={`key${member}`} />
      ))}
    </div>
  );
};

export default Members;
