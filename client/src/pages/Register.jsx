import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          email,
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      if (data.status === 400 && data.text["code"] === 11000) {
        console.log("Email already exists.");
      } else if (data.status === 200) {
        console.log("User created successfully.");
      }
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="bg-white p-6 rounded shadow-lg w-[300px] md:w-[400px] lg:w-[500px]">
        <h2 className="text-2xl font-semibold mb-5">Register</h2>
        <form onSubmit={registerUser}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              We never share your email with anyone.
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 focus:outline-none focus:ring-blue-500"
          >
            Register
          </button>
          <br />
          <div className="flex gap-1">
            Already registered?
            <p className="block text-gray-600 hover:text-blue-600">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
