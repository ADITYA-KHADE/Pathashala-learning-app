import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import RoleCheckbox from "../components/RoleCheckbox"
import { toast } from "react-hot-toast";
import {useAuthContext} from "../contexts/AuthContext"

const signup = () => {
  const {setAuthUser}=useAuthContext();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
    subject: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
          confirmpassword: inputs.confirmpassword,
          role: inputs.role,
          subject: inputs.subject,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        localStorage.setItem("user", JSON.stringify(data));
        setAuthUser(data);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
    catch(err){
      console.log(err);
    }
  };

  const handleCheckboxChange = (role) => {
    setInputs({ ...inputs, role });
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
      <div className="bg-white  sm:mx-auto sm:w-full sm:max-w-sm rounded-3xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto" src={Logo} alt="Your Company" />
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up your account
          </h2>
        </div>

        <div className="py-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 px-3 text-gray-900"
              >
                Name
              </label>
              <div className="mt-1 px-3">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter name"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                  required
                  className="bg-white text-gray-900 block w-full rounded-md border-0 py-1 
                   shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 px-3 text-gray-900"
              >
                Email
              </label>
              <div className="mt-1 px-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter email"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                  required
                  className="bg-white text-gray-900 block w-full rounded-md border-0 py-1  shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 px-3 text-gray-900"
              >
                Password
              </label>
              <div className="mt-1 px-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className="block bg-white text-gray-900 w-full rounded-md border-0 py-1  
                      shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium leading-6 px-3 text-gray-900"
              >
                ConfirmPassword
              </label>
              <div className="mt-1 px-3">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  value={inputs.confirmpassword}
                  onChange={(e) =>
                    setInputs({ ...inputs, confirmpassword: e.target.value })
                  }
                  placeholder="Confirm password"
                  autoComplete="confirm-password"
                  required
                  className="block bg-white text-gray-900 w-full rounded-md border-0 py-1  
                      shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium leading-6 px-3 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2 px-3">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="text"
                  placeholder="Enter only one subject"
                  value={inputs.subject}
                  onChange={(e) =>
                    setInputs({ ...inputs, subject: e.target.value })
                  }
                  required
                  className="bg-white text-gray-900 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <RoleCheckbox onCheckboxChange={handleCheckboxChange} selectedRole={inputs.role} />
            <div className="px-3">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default signup;
