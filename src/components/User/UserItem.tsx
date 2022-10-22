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
        <p className="w-1/6">{id}</p> 
        <p className="w-1/3">{name}</p>
        <p className="w-1/4">{phoneNumber}</p>
        <p className="w-1/4">{userId}</p>
      </div>
    </Card>
  );
};

export default UserItem;
