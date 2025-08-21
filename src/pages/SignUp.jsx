import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        console.log(result);
        const userData = result.user;
        updateUser({ displayName: userName })
          .then(() => {
            setUser({ ...userData, displayName: userName });
            navigate("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex items-center justify-center py-10">
      <form
        onSubmit={handleSignUp}
        className="card w-full max-w-md shadow-xl bg-white p-8 border-2 border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Create an account on TripMate
        </h2>
        {/* name Input */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            name="name"
          />
        </div>

        {/* Email Input */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            name="email"
          />
        </div>

        {/* Password Input */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            name="password"
          />
        </div>

        {/* Login Button */}
        <div className="form-control">
          <button className="btn btn-primary w-full">Login</button>
        </div>

        {/* Footer Links */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/signIn" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
