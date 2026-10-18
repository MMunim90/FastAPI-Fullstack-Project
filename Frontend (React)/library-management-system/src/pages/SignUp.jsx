const SignUp = () => {
  return (
    <div className="modal-box relative max-w-lg rounded-2xl p-8 shadow-2xl">
      {/* Close Button */}
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
          ✕
        </button>
      </form>

      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="text-3xl font-bold">Create Account</h3>
        <p className="mt-2 text-sm text-base-content/60">
          Join us by creating your account.
        </p>
      </div>

      {/* Signup Form */}
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* First Name */}
          <fieldset className="fieldset">
            <label className="label">First Name</label>
            <input
              type="text"
              name="firstname"
              className="input input-bordered w-full"
              placeholder="First name"
              required
            />
          </fieldset>

          {/* Last Name */}
          <fieldset className="fieldset">
            <label className="label">Last Name</label>
            <input
              type="text"
              name="lastname"
              className="input input-bordered w-full"
              placeholder="Last name"
              required
            />
          </fieldset>
        </div>

        {/* Username */}
        <fieldset className="fieldset">
          <label className="label">Username</label>
          <input
            type="text"
            name="username"
            className="input input-bordered w-full"
            placeholder="Choose a username"
            autoComplete="username"
            required
          />
        </fieldset>

        {/* Email */}
        <fieldset className="fieldset">
          <label className="label">Email Address</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </fieldset>

        {/* Phone Number */}
        <fieldset className="fieldset">
          <label className="label">Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            className="input input-bordered w-full"
            placeholder="Enter your phone number"
            autoComplete="tel"
            required
          />
        </fieldset>

        {/* Password */}
        <fieldset className="fieldset">
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </fieldset>

        {/* Role */}
        <fieldset className="fieldset">
          <label className="label">Account Role</label>
          <select
            name="role"
            className="select select-bordered w-full"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="member">Member</option>
            <option value="librarian">Librarian</option>
          </select>
        </fieldset>

        {/* Submit */}
        <button type="submit" className="btn btn-primary mt-4 w-full">
          Create Account
        </button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          className="link link-primary font-semibold"
          onClick={() => {
            document.getElementById("signup_modal").close();
            document.getElementById("my_modal_3").showModal();
          }}
        >
          Login
        </button>
      </div>
      {/* Click Outside to Close */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </div>
  );
};

export default SignUp;
