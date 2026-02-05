"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
    shortMessage: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    if (!form.username || !form.name || !form.password || !form.confirmPassword) {
      setError("Username, Name and Password are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem("assignment.onetan.in.Username", form.username);
      localStorage.setItem("assignment.onetan.in.Password", form.password);
      alert("Account created successfully 🎉");
      router.push("/account");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen justify-center items-center bg-white px-4 py-8">
      <form onSubmit={handleRegister} className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="space-y-3">
            <input 
              name="username" 
              placeholder="Username" 
              onChange={updateField} 
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              name="name" 
              placeholder="Full Name" 
              onChange={updateField} 
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              name="profileImage" 
              placeholder="Profile image URL (optional)" 
              onChange={updateField} 
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            {form.profileImage && (
              <img 
                src={form.profileImage} 
                className="w-24 h-24 rounded-full mx-auto object-cover" 
                alt="Profile preview"
              />
            )}
            <textarea 
              name="shortMessage" 
              placeholder="Short Bio (optional)" 
              onChange={updateField} 
              className="w-full px-4 py-3 bg-gray-100 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={updateField} 
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              onChange={updateField} 
              className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          {/* Right Section */}
          <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
            <p className="text-sm font-semibold text-gray-600 mb-3">Social Links (optional)</p>
            <input 
              name="facebook" 
              placeholder="Facebook URL" 
              onChange={updateField} 
              className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              name="twitter" 
              placeholder="Twitter URL" 
              onChange={updateField} 
              className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              name="instagram" 
              placeholder="Instagram URL" 
              onChange={updateField} 
              className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <input 
              name="linkedin" 
              placeholder="LinkedIn URL" 
              onChange={updateField} 
              className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        <button 
          disabled={loading} 
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </section>
  );
}