import { Routes, Route } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css"
import { withAuthenticator } from '@aws-amplify/ui-react';

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import GlobalPosts from "./containers/GlobalPostsComponent";
import Sidebar from "./containers/SidebarComponent";
import UserIdPosts from "./containers/UserIdPostsComponent";

function App({ user, signOut }) {
  console.log(user)
  return (
  <Container>
    <Grid container spacing={2} mt={2}>
      <Grid item xs={4}>
        <Sidebar user={user} signOut={signOut} />
      </Grid>
      <Grid item xs={6}>
        <Routes>
          <Route path="/" element={<GlobalPosts />} />
          <Route path="global" element={<GlobalPosts />} />
          <Route path=":userId" element={<UserIdPosts />} />
          <Route path="*" element={<GlobalPosts />} />
        </Routes>
      </Grid>
    </Grid>
  </Container>
  );
}

export default withAuthenticator(App);
