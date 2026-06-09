import z from "zod";
import { useRegister } from "../features/auth/useRegister";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const schema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { mutate, isPending } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    mutate(data);
  }

  return (
    <div className="mx-auto mt-10 max-w-md px-4">
      <h1 className="mb-2 text-center text-4xl font-semibold">Sign up</h1>

      <p className="mb-8 text-center">
        <Link to="/login" className="text-green-500">
          Have an account?
        </Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            placeholder="Username"
            {...register("username")}
            className="w-full rounded border border-gray-300 p-4 text-lg"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.username?.message}
          </p>
        </div>

        <div>
          <input
            placeholder="Email"
            {...register("email")}
            className="w-full rounded border border-gray-300 p-4 text-lg"
          />

          <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded border border-gray-300 p-4 text-lg"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            disabled={isPending}
            className="rounded bg-green-500 px-6 py-3 text-lg text-white hover:bg-green-600"
          >
            {isPending ? "Creating..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}
