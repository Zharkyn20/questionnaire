import SignInForm from "@/modules/auth/components/signin_form";

function SignInPage() {
  return (
    <main>
      <div className="container min-h-screen flex items-center">
        <SignInForm />
      </div>
    </main>
  );
}

export default SignInPage;
