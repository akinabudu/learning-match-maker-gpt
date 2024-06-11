'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      const { token } = await res.json();
      localStorage.setItem('token', token);

      router.push('/');
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="mb-4 p-2 border border-gray-300 rounded w-full"/>
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="mb-4 p-2 border border-gray-300 rounded w-full"/>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
    </form>
  );
};

export default Login;
