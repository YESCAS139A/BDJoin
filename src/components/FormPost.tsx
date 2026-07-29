import { useState } from "react";

import Button from "./Button";
import Label from "./Label";
import TextArea from "./TextArea";

type FormPostProps = {
  onSubmitPost: (content: string) => Promise<void>;
  onCancel?: () => void;
};

const FormPost = ({ onSubmitPost, onCancel }: FormPostProps) => {
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

  const handleCancel = () => {
    setPost("");
    setError(null);
    if (onCancel) {
      onCancel();
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
        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1">
            <Button name="Post a message" disabled={isEmpty || isSubmitting} />
          </div>
          <Button
            type="button"
            onClick={handleCancel}
            name="Cancel"
            disabled={isSubmitting || (isEmpty && !error)}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 rounded-lg disabled:opacity-50 transition-colors cursor-pointer text-center"
          />
        </div>
      </form>
    </div>
  );
};

export default FormPost;
