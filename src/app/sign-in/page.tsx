import Icons from "@/components/Icons";
import SignInButton from "@/components/SignInButton";

export default function SignIn() {
  return (
    <div className="flex w-full h-5/6 mt-3 justify-center items-center bg-transparent">
      <div className="p-12 max-w-sm flex flex-col bg-white rounded shadow gap-3 items-center">
        <Icons.onion size={40} />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-center">
          {" "}
          By continuing, you are setting up an Opinion account and agree to our User Agreement and Privacy Policy.
        </p>
        <SignInButton />
      </div>
    </div>
  );
}
