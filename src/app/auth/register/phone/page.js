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
    <section className="flex min-h-screen justify-center items-center bg-white px-4">
      <form onSubmit={handleRegister} className="w-full max-w-md space-y-3">
        <h1 className="text-2xl font-bold text-center mb-4">Create Account</h1>
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}
        <input 
          name="username" 
          placeholder="Username" 
          onChange={updateField} 
          className="w-full p-3 bg-black/5 rounded-lg" 
        />
        <input 
          name="name" 
          placeholder="Full Name" 
          onChange={updateField} 
          className="w-full p-3 bg-black/5 rounded-lg" 
        />
        <input 
          name="profileImage" 
          placeholder="Profile image URL (optional)" 
          onChange={updateField} 
          className="w-full p-3 bg-black/5 rounded-lg" 
        />
        {form.profileImage && (
          <img src={form.profileImage} className="w-24 h-24 rounded-full mx-auto object-cover" />
        )}
        <textarea 
          name="shortMessage" 
          placeholder="Short Bio (optional)" 
          onChange={updateField} 
          className="w-full p-3 bg-black/5 rounded-lg h-24 resize-none" 
        />
        <div className="border rounded p-3 space-y-2">
          <p className="text-sm font-semibold text-gray-500">Social Links (optional)</p>
          <input 
            name="facebook" 
            placeholder="Facebook URL" 
            onChange={updateField} 
            className="w-full p-3 bg-black/5 rounded-lg" 
          />
          <input 
            name="twitter" 
            placeholder="Twitter URL" 
            onChange={updateField} 
            className="w-full p-3 bg-black/5 rounded-lg" 
          />
          <input 
            name="instagram" 
            placeholder="Instagram URL" 
            onChange={updateField} 
            className="w-full p-3 bg-black/5 rounded-lg" 
          />
          <input 
            name="linkedin" 
            placeholder="LinkedIn URL" 
            onChange={updateField} 
            className="w-full p-3 bg-black/5 rounded-lg" 
          />
        </div>
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={updateField} 
          className="w-full p-3 bg-black/5 rounded-lg" 
        />
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          onChange={updateField} 
          className="w-full p-3 bg-black/5 rounded-lg" 
        />
        <button 
          disabled={loading} 
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </section>
  );
}