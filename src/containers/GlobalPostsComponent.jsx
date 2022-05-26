import * as React from "react";
import { API, graphqlOperation } from "aws-amplify";
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

function GlobalPostsPage() {

  const [posts, setPosts] = React.useReducer(reducer, []);
  const [isLoading, setIsLoading] = React.useState(true);

  // load fetched posts.
  // subscribe to newOnCreatePost mutation
  React.useEffect(() => {
    fetchPosts(INITIAL_QUERY);

    const subscription = API.graphql(graphqlOperation(subscriptions.newOnCreatePost)
    ).subscribe({
      next: (msg) => {
        console.log("Post subscription triggered");
        const post = msg.value.data.newOnCreatePost;
        setPosts({ type: SUBSCRIPTION, post: post });
      },
      error: error => {
        console.log(error);
      }
    });
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  // GET all posts
  const fetchPosts = async (type) => {
    try {
      const result = await API.graphql({
        query: queries.searchPosts,
        variables: {
          filter: { id: { exists: true } },
          sort: { direction: "desc", field: "createdAt" },
          limit: 30
        },
      });
      console.log(result);
      setPosts({ type: type, posts: result.data.searchPosts.items });
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
    };
  }

  return (
    <PostDirectory
      isLoading={isLoading}
      posts={posts}
    />
  );
}

export default GlobalPostsPage;