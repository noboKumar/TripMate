import React from "react";
import { Link } from "react-router";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="card w-full max-w-md shadow-xl bg-white p-8 border-2 border-gray-200">
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
      </div>
    </div>
  );
};

export default SignUp;
