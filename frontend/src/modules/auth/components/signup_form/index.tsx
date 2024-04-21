import Input from "@/components/shared/input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useCallback, useState } from "react";
import Button from "@/components/shared/Button";
import useAuthStore from "../../store";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const userState = useAuthStore();
  const [loading, setLoading] = useState(false);

  const signup = useCallback(
    async (data: { email: string; password: string; name: string }) => {
      setLoading(true);
      await userState.signup({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      setLoading(false);
    },
    [userState]
  );

  return (
    <div className="w-full max-w-80 mx-auto">
      <h1 className="text-center text-xl mb-4 font-normal">
        Join to <span className="text-primary">Questionnaire</span>
      </h1>
      <form
        className="border border-gray-200 rounded-lg shadow bg-gray-100 py-6 px-6 mx-auto grid gap-4"
        onSubmit={handleSubmit(signup)}
      >
        <Input
          label="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Company name"
          error={errors.email?.message}
          {...register("name")}
        />
        <Input.Password
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" loading={loading}>
          <span className="font-medium">Sign up</span>
        </Button>
        <div>
          <p className="text-center">
            Already registered?{" "}
            <Link
              to="/signin"
              className="text-primary hover:underline underline-offset-2 text-nowrap"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
