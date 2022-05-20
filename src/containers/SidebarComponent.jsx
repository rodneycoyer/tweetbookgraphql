import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import ListItemIcon from "@mui/material/ListItemIcon";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Auth, API, graphqlOperation } from "aws-amplify";
import { createPost } from "../graphql/mutations";

// message max char
const MAX_POST_CONTENT_LENGTH = 140;

function Sidebar() {
  // nav selected setting
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleNavSelected = (event, index) => {
    setSelectedIndex(index)
  };

  return (
      <Stack spacing={2}>
        <Card sx={{position: "sticky"}}>
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h6">
                  {"username"}
                </Typography>
                <Typography variant="overline">
                  {"user@email"}
                </Typography>
              </Box>
            <Divider />
            </Stack>
          </CardContent>
        <List>
          <Link to="userId" style={{color: "white", textDecoration: "none"}}>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleNavSelected(event, 0)}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                  <ListItemText primary="My Posts" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="global" style={{color: "white", textDecoration: "none"}}>
            <ListItem disablePadding>
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleNavSelected(event, 1)}
                >
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                    <ListItemText primary="Global Posts" />
                </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Card>
    </Stack>
  );
}

export default Sidebar;