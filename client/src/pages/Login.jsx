import React from "react";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { setAuthUser } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(data));
        setAuthUser(data);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="bg-white mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-3xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-28 w-auto" src={Logo} alt="Your Company" />
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="py-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 px-3 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2 px-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white text-gray-900 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between px-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 px-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block bg-white text-gray-900 w-full rounded-md border-0 py-1.5  
                  shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="px-3">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have account?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
