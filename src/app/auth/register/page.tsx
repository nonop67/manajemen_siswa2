"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { text: "", color: "", width: "w-0" };
    if (password.length >= 12) return { text: "Strong", color: "text-green-600", width: "w-full" };
    if (password.length >= 8) return { text: "Medium", color: "text-yellow-600", width: "w-2/3" };
    return { text: "Weak", color: "text-red-600", width: "w-1/3" };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please enter your name and email.");
      return;
    }

    if (!formData.password || formData.password !== formData.confirmPassword) {
      alert("Password do not match.");
      return;
    }

    if (!acceptedTerms) {
      alert("You must accept the terms and conditions to register.");
      return;
    }

    console.log("Form submitted:", formData);
    router.push("/auth/login");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10" />

          <div className="relative z-10">
            <a
              href="/auth/login"
              className="mb-6 flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </a>

            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-600">Join us today! It takes only a few steps.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white/80 pl-11 pr-4 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white/80 pl-11 pr-4 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    required
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white/80 pl-11 pr-12 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {formData.password && (
                  <div className="mt-2">
                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                      <div className={`h-full ${passwordStrength.width} rounded-full bg-current ${passwordStrength.color}`} />
                    </div>
                    <p className={`mt-1 text-xs ${passwordStrength.color}`}>
                      Password strength: {passwordStrength.text}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white/80 pl-11 pr-12 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {formData.confirmPassword && (
                  <p className={`mt-1 text-xs ${passwordsMatch ? "text-green-600" : "text-red-600"}`}>
                    {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                  </p>
                )}
              </div>

              <label className="flex items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-blue-600"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
                    Terms and Conditions
                  </a>
                </span>
              </label>

              <button
                type="submit"
                className="h-12 w-full rounded-lg bg-blue-600 font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/auth/login" className="font-medium text-blue-600 hover:text-blue-700">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}