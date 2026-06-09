import { useForm } from "react-hook-form";
import { useCreateComment } from "./useCreateComment";
import { useCurrentUser } from "../auth/useCurrentUser";
import { Link } from "react-router-dom";

type FormData = {
  body: string;
};

type CommentFormProps = {
  slug: string;
};

export default function CommentForm({ slug }: CommentFormProps) {
  const { mutate, isPending } = useCreateComment();
  const { data: currentUser } = useCurrentUser();
  const { register, handleSubmit, reset } = useForm<FormData>();

  function onSubmit(data: FormData) {
    mutate(
      {
        slug,
        body: data.body,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  }

  if (!currentUser) {
    return (
      <div className="rounded border border-gray-300 p-4 text-center">
        <p>
          Please{" "}
          <Link
            to="/login"
            className="font-semibold text-green-500 hover:text-green-600"
          >
            sign in{" "}
          </Link>
          to add comments.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-8 overflow-hidden rounded border border-gray-300"
    >
      <textarea
        placeholder="Write a comment..."
        {...register("body", { required: true })}
        className="min-h-30 w-full resize-none p-4 outline-none"
      />

      <div className="flex justify-center border-t border-gray-300 bg-gray-100 p-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          {isPending ? "Posting" : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
