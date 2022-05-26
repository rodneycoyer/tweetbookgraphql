import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Typography from "@mui/material/Typography";


function RenderPostCard({ post }) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Box sx={{ xs:3 }}>
            <IconButton>
              <Avatar
                src={post.owner}
                alt={post.owner}
              />
            </IconButton>
          </Box>
        }
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title={post.owner}
        subheader={post.createdAt}
      />
      <CardContent>
        <Typography variant="p"> {post.content} </Typography>
      </CardContent>
      <Divider />
        <Box sx={{ display: "flex", p: 1 }}>
            Post Options
        </Box>
    </Card>
  );
}

function PostList({ posts, isLoading }) {

  const renderPosts = posts.map(post => {
    return (
      <Grid item mb={1} key={post.id} >
        <RenderPostCard post={post} />
     </Grid>
    );
  });

  return (
    <>
      {
      isLoading ?
        <Box sx={{ textAlign: "center", mt: 20 }}>
          <CircularProgress size={50} />
        </Box>
      :
        <Box>
          {renderPosts}
        </Box>
      }
    </>
  );
}

export default PostList;