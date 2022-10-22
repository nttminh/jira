import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";

type Props = {
  user: any;
};

const UserItem = (props: Props) => {
  const { id, avatar, name, phoneNumber, userId } = props?.user;
  return (
    <Card variant="outlined">
      <div className="flex flex-row justify-between items-center px-5">
        <Avatar alt={name} src={avatar} />
        <p>{id}</p> <p></p>
        <p>{name}</p>
        <p>{phoneNumber}</p>
        <p>{userId}</p>
      </div>
    </Card>
  );
};

export default UserItem;
