'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    materials: [],
    liveSessions: [],
    inPersonSessions: [],
    price: 0,
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
      const res = await fetch('/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      router.push('/');
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <input type="text" name="title" placeholder="Title" onChange={handleChange} className="mb-4 p-2 border border-gray-300 rounded w-full"/>
      <textarea name="description" placeholder="Description" onChange={handleChange} className="mb-4 p-2 border border-gray-300 rounded w-full"></textarea>
      <input type="number" name="price" placeholder="Price" onChange={handleChange} className="mb-4 p-2 border border-gray-300 rounded w-full"/>
      {/* Add inputs for materials, liveSessions, and inPersonSessions */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create Course</button>
    </form>
  );
};

export default CreateCourse;
