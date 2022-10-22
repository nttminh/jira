import React, { useEffect, useState } from "react";
import { getUser } from "../api/getUser";
import UserItem from "../components/User/UserItem";

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
      {members?.map((member) => (
        <UserItem user={member} key={member?.id} />
      ))}
    </div>
  );
};

export default Members;
