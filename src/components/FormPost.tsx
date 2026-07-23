import Button from "./Button";
import Label from "./Label";
import TextArea from "./TextArea";

const FormPost = () => {
  return (
    <div>
      <form>
        <Label
          name="Post your message here"
          className="text-sm font-semibold text-gray-700"
        />
        <TextArea
          placeholder="Post here..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <Button name="Post a message" />
      </form>
    </div>
  );
};

export default FormPost;
