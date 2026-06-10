import { useForm } from "react-hook-form";
import { useCreateArticle } from "../features/articles/useCreateArticle";
import { useParams } from "react-router-dom";
import { useArticle } from "../features/articles/useArticle";
import { useEffect } from "react";
import { useUpdateArticle } from "../features/articles/useUpdateArticle";
import { Helmet } from "react-helmet-async";

type FormData = {
  title: string;
  description: string;
  body: string;
  tags: string;
};

export default function Editor() {
  const { mutate: createArticle, isPending } = useCreateArticle();
  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticle();
  const submitting = isPending || isUpdating;
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { slug } = useParams();
  const isEditMode = !!slug;
  const { data } = useArticle(slug || "");

  useEffect(() => {
    if (isEditMode && data?.article) {
      reset({
        title: data.article.title,
        description: data.article.description,
        body: data.article.body,
        tags: data.article.tagList.join(", "),
      });
    }
  }, [data, isEditMode, reset]);

  function onSubmit(data: FormData) {
    const articleData = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    if (isEditMode && slug) {
      updateArticle({ slug, articleData });
      return;
    }
    createArticle(articleData);
  }

  return (
    <>
      <Helmet>
        <title>
          {isEditMode ? "Edit Article - Conduit" : "New Article - Conduit"}
        </title>
      </Helmet>
      <div className="mx-auto mt-10 max-w-4xl px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="Article Title"
            {...register("title")}
            className="w-full rounded border border-gray-300 p-4 text-2xl"
          />

          <input
            placeholder="What's this article about?"
            {...register("description")}
            className="w-full rounded border border-gray-300 p-4"
          />

          <textarea
            placeholder="Write your article..."
            {...register("body")}
            rows={12}
            className="w-full rounded border border-gray-300 p-4"
          />

          <input
            placeholder="enter your tags please"
            {...register("tags")}
            className="w-full rounded border border-gray-300 p-4"
          />

          <div className="flex justify-end">
            <button
              disabled={submitting}
              className="rounded bg-green-500 px-6 py-3 text-lg text-white hover:bg-green-600"
            >
              {submitting
                ? "Saving..."
                : isEditMode
                  ? "Update Article"
                  : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
