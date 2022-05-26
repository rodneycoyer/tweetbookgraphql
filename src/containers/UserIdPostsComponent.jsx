import * as React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useParams } from 'react-router';
import PostDirectory from "../components/PostDirectoryComponent";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";

// action types
const SUBSCRIPTION = "SUBSCRIPTION";
const INITIAL_QUERY = "INITIAL_QUERY";
const ADDITIONAL_QUERY = "ADDITIONAL_QUERY";

// action reducer
const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.posts;
    case ADDITIONAL_QUERY:
      return [...state, ...action.posts];
    case SUBSCRIPTION:
      return [action.post, ...state];
    default:
      return state;
  };
};


function UserIdPostsPage() {

  const [posts, setPosts] = React.useReducer(reducer, []);
  const [isLoading, setIsLoading] = React.useState(true);

  const { userId } = useParams();

  // fetch userId posts
  // subscribe to userId newOnCreate mutation
  React.useEffect(() => {
    fetchUserPosts(INITIAL_QUERY);

    const subscription = API.graphql(graphqlOperation(subscriptions.newOnCreatePost)
    ).subscribe({
      next: (msg) => {
        console.log("Post subscription triggered")
        const post = msg.value.data.newOnCreatePost;
        if (post.owner !== userId) return;
        setPosts({ type: SUBSCRIPTION, post: post })
      },
      error: error => {
        console.log(error);
      }
    });
    return () => {
      subscription.unsubscribe();
    }
  }, [])

  const fetchUserPosts = async (type) => {
    try {
      const result = await API.graphql({
        query: queries.searchPosts,
        variables: {
          filter: { owner: { match: userId } },
          sort: { direction: "desc", field: "createdAt" },
        },
      });
      console.log(result);
      setPosts({ type: type, posts: result.data.searchPosts.items });
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <PostDirectory
      isLoading={isLoading}
      posts={posts}
    />
  );
}

export default UserIdPostsPage;