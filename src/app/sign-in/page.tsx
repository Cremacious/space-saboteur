import Link from 'next/link';
import SignUpForm from './components/SignInForm';

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-2 md:p-6">
      <div className="metallic-container max-w-md w-full p-8 flex flex-col items-center space-y-6 shadow-2xl">
        <h1 className="neon-header space-font text-3xl mb-2 text-center">
          Log In
        </h1>
        {/* <p className="text-cyan-200 space-font text-center mb-4">
          Join Space Saboteur and outwit your friends among the stars!
        </p> */}
        <SignUpForm />
        <div className="w-full flex justify-center mt-4">
          <span className="text-white space-font text-sm">
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              className="text-cyan-300 underline hover:text-cyan-400 transition-colors duration-150 space-font"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
