import { useState } from "react";

import Button from "./Button";
import Label from "./Label";
import TextArea from "./TextArea";

type FormPostProps = {
  onSubmitPost: (content: string) => Promise<void>;
};

const FormPost = ({ onSubmitPost }: FormPostProps) => {
  const [post, setPost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmpty = !post.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmpty || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmitPost(post);
      setPost("");
    } catch {
      setError("The post could not be published. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label
          name="Post your message here"
          className="text-sm font-semibold text-gray-700"
        />
        <TextArea
          placeholder="Post here..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <Button name="Post a message" disabled={isEmpty || isSubmitting} />
      </form>
    </div>
  );
};

export default FormPost;
