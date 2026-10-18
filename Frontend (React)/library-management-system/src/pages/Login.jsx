const Login = () => {
  return (
    <div className="modal-box relative max-w-md rounded-2xl p-8 shadow-2xl">
      {/* Close Button */}
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
          ✕
        </button>
      </form>

      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="text-3xl font-bold">Welcome Back!</h3>
        <p className="mt-2 text-sm text-base-content/60">
          Sign in to continue to your account.
        </p>
      </div>

      {/* Login Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="fieldset">
          <label className="label font-medium">Username</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter your username"
            required
          />

          <label className="label mt-2 font-medium">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            required
          />

          {/* <div className="mt-2 text-right">
            <a
              href="/forgot-password"
              className="link link-hover text-sm text-primary"
            >
              Forgot password?
            </a>
          </div> */}

          <button type="submit" className="btn btn-primary mt-10 w-full">
            Login
          </button>
        </fieldset>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          className="link link-primary font-semibold"
          onClick={() => {
            document.getElementById("my_modal_3").close();
            document.getElementById("signup_modal").showModal();
          }}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
