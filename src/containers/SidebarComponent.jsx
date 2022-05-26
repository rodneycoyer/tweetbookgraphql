import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import ListItemIcon from "@mui/material/ListItemIcon";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";

// export Sidebar
const Sidebar = ({ user, signOut }) => {

  // post value && validation
  const [value, setValue] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  // nav selected setting
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  // toggle nav selection
  const handleNavSelected = (event, index) => {
    setSelectedIndex(index);
  };

  // create new post text-field
  const handleTextChange = (event) => {
    setValue(event.target.value);
    if (event.target.value.length > 140 || event.target.value.length < 1) {
      setIsError(true);
      setHelperText(140 - event.target.value.length)
    } else {
      setIsError(false);
      setHelperText("");
    }
  };

  // POST create new post
  const createPost = async () => {
    const result = await API.graphql({
      query: mutations.createPost,
      variables: {input: {content: value}}
    });
    console.log(result);
    setValue("");
  };

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5">
                {user.username}
              </Typography>
              <Typography variant="overline">
                {user.attributes.email}
              </Typography>
            </Box>
            <Box pb={2}>
              <Button
                fullWidth
                onClick={signOut}
                variant="outlined"
                color="error"
              >
                Sign Out
              </Button>
            </Box>
          <Divider />
          </Stack>
        </CardContent>
      <List>
        <Link to={user.username} style={{color: "white", textDecoration: "none"}}>
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
        <Stack spacing={3} mt={1} mb={1} p={2}>
          <TextField
            label="create your post"
            value={value}
            onChange={handleTextChange}
            error={isError}
            helperText={helperText}
            multiline
            maxRows="5"
          />
          <Button
            onClick={createPost}
            disabled={isError}
            fullWidth
            variant="contained"
            color="primary"
            sx={{p: 2}}
          >
            Post to Timeline
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}

export default Sidebar;