
import Input from "@/components/shared/input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useCallback } from "react";
import Button from "@/components/shared/Button";

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const signin = useCallback(
    async (data: { email: string; password: string }) => {
      console.log(data);
    },
    []
  );

  return (
    <div className="w-full max-w-80 mx-auto">
      <h1 className="text-center text-xl mb-4 font-normal">
        Sign in to <span className="text-primary">Questionnaire</span>
      </h1>
      <form
        className="border border-gray-200 rounded-lg shadow bg-gray-100 py-6 px-6 mx-auto grid gap-4"
        onSubmit={handleSubmit(signin)}
      >
        <Input
          label="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input.Password
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit">
          <span className="font-medium">Sign in</span>
        </Button>
        <div>
          <p className="text-center">
            New to Questionnaire?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline underline-offset-2 text-nowrap"
            >
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
