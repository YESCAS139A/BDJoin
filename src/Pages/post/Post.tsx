import { useNavigate } from "react-router-dom";

import postApi from "../../api/post";
import FormPost from "../../components/FormPost";

const Post = () => {
  const navigate = useNavigate();

  const handleCreatePost = async (content: string) => {
    await postApi.createPost({ content });

    navigate("/home");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-center font-bold text-gray-700 text-lg">Post</h1>

      <FormPost onSubmitPost={handleCreatePost} />
    </div>
  );
};

export default Post;
