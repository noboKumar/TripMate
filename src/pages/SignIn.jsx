import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    loginUser(email, password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="flex items-center justify-center py-10">
      <form
        onSubmit={handleSignIn}
        className="card w-full max-w-md shadow-xl bg-white p-8 border-2 border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Login to TripMate
        </h2>

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
            required
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
            required
          />
        </div>

        {/* Login Button */}
        <div className="form-control">
          <button className="btn btn-primary w-full">Login</button>
        </div>

        {/* Footer Links */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
