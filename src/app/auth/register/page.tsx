"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "trainee",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      if (response.status !== 201) {
        const { message } = response.data;
        throw new Error(message);
      }
    
      router.push("/auth/login");
    } catch (error:any) {
      setError(error.message);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <select
        name="role"
        title="Select a role"
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      >
        <option value="trainee">Trainee</option>
        <option value="trainer">Trainer</option>
      </select>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
