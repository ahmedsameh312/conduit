import { useForm } from "react-hook-form";
import { useCurrentUser } from "../features/auth/useCurrentUser";
import { useUpdateUser } from "../features/auth/useUpdateUser";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

type FormData = {
  email: string;
  username: string;
  bio: string;
  image: string;
  password: string;
};

export default function Settings() {
  const { data } = useCurrentUser();
  const { mutate, isPending } = useUpdateUser();
  const { logout } = useAuth();

  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    if (data?.user) {
      reset({
        email: data.user.email,
        username: data.user.username,
        bio: data.user.bio || "",
        image: data.user.image || "",
        password: "",
      });
    }
  }, [data, reset]);

  function onSubmit(formData: FormData) {
    mutate(formData);
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl px-4">
      <h1 className="mb-8 text-center text-4xl font-semibold">Your Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          placeholder="URL of profile picture"
          {...register("image")}
          className="w-full rounded border border-gray-300 p-3"
        />

        <input
          placeholder="Username"
          {...register("username")}
          className="w-full rounded border border-gray-300 p-4 text-lg"
        />

        <textarea
          placeholder="Bio"
          {...register("bio")}
          rows={3}
          className="w-full rounded border border-gray-300 p-4"
        />

        <input
          placeholder="Email"
          {...register("email")}
          className="w-full rounded border border-gray-300 p-4 text-lg"
        />

        <input
          type="password"
          placeholder="New Password"
          {...register("password")}
          className="w-full rounded border border-gray-300 p-4 text-lg"
        />

        <div className="flex justify-end">
          <button
            disabled={isPending}
            className="rounded bg-green-500 px-6 py-3 text-lg text-white hover:bg-green-600"
          >
            {isPending ? "Saving..." : "Update Settings"}
          </button>
        </div>
      </form>

      <hr className="my-8 border-gray-300" />

      <button
        type="button"
        onClick={logout}
        className="text-red-500 hover:text-red-600"
      >
        Or click here to logout.
      </button>
    </div>
  );
}
