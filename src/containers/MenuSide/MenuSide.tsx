import * as React from "react";
import Router from "next/router";
import Link from "next/link";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import GroupsIcon from "@mui/icons-material/Groups";
import MoreIcon from "@mui/icons-material/More";
type Props = {};

const MenuSide = (props: Props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const router = Router;
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Box>
      <List component="nav" aria-label="main mailbox folders">
        <h3>Our Active Project</h3>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => {
            setSelectedIndex(0);
            router.push("/backlog");
          }}
        >
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="Backlog" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => {
            setSelectedIndex(1);
            router.push("/active");
          }}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Active project" />
        </ListItemButton>
      </List>
      <List component="nav" aria-label="main mailbox folders">
        <h3>All of Projects</h3>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => {
            setSelectedIndex(2);
            router.push("/projects");
          }}
        >
          <ListItemIcon>
            <MoreIcon />
          </ListItemIcon>
          <ListItemText primary="Projects list" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => {
            setSelectedIndex(3);
            router.push("/members");
          }}
        >
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Team members" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default MenuSide;
