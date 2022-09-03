import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Router from "next/router";
type Props = {};

const pages = [
  { label: "Profile and visibility", link: "/manage-profile" },
  { label: "Email", link: "/manage-profile/email" },
  { label: "Security", link: "/manage-profile/password" },
];

const ProfileMenuSide = (props: Props) => {
  const router = Router;

  return (
    <Box sx={{ height: "100%", bgcolor: "#f4f5f7", pr: 2 }}>
      <List component="nav" aria-label="main mailbox folders">
        <Typography variant="h6" py={2}>
          Atlassian account
        </Typography>
        {pages.map((page, index) => (
          <ListItemButton
            key={page.link}
            selected={page.link === router.pathname}
            onClick={(event) => {
              router.push(page.link);
            }}
          >
            <ListItemText
              disableTypography
              primary={page.label}
              sx={{ fontSize: 14 }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default ProfileMenuSide;
