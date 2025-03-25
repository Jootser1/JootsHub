"use client";
import { useState } from "react";
import { signIn} from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
    } else {
      router.push("/hub");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h1 className="text-2xl font-bold text-center mb-4">JOOTS</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            id="email"
            name="email"
            placeholder="Email / ID Jootser" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full p-2 border rounded mb-2"
          />
          <input 
            type="password" 
            id="password"
            name="password"
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">
            Se connecter
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
