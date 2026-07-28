import { useState } from "react";

import UserFeed from "../../components/UserFeed";
import FormPost from "../../components/FormPost";
import postApi from "../../api/post";

const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreatePost = async (content: string) => {
    await postApi.createPost({ content });
    setRefreshKey((key) => key + 1);
  };

  return (
    <div className="space-y-6">
      <FormPost onSubmitPost={handleCreatePost} />
      <UserFeed
        key={refreshKey}
        showOwnerActions={false}
        emptyMessage="There are no posts yet."
      />
    </div>
  );
};

export default Home;
