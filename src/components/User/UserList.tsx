import React, { useEffect, useState } from "react";
import { getUser } from "../../api/getUser";
import UserItem from "./UserItem";

type Props = {};

const UserList = (props: Props) => {
    const {id} = props;
  const [members, setMembers] = useState([]);
  const getUsers = async () => {
    const res = await getUser().getUserListById(id);
    setMembers(res.data.content);
    console.log("user", res.data.content);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      {members?.map((member) => (
        <UserItem user={member} />
      ))}
    </div>
  );
};

export default UserList;
