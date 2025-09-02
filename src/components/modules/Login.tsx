"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Eye, EyeOff, X } from "lucide-react";
import loginImg from "../../../public/login.jpg";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.ok) {
        await Swal.fire({
          icon: "success",
          title: "Logged in!",
          text: "You have successfully logged in.",
          confirmButtonColor: "#3085d6",
        });
        window.location.href = "/products";
      } else {
        await Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Incorrect email or password",
          confirmButtonColor: "#d33",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-5xl bg-[#071400] rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white/70 p-2">
          <X size={20} />
        </button>

        <div className="flex">
          {/* Left Panel - Login Form */}
          <div className="w-1/2 bg-[#071400] p-12 flex items-center">
            <div className="max-w-[400px] mx-auto">
              <h1 className="text-3xl font-bold text-white mb-2">
                Login your account
              </h1>
              <p className="text-green-200 text-sm mb-8">
                Don&apos;t have an account?{" "}
                <span className="text-green-400 cursor-pointer hover:underline">
                  Sign up
                </span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-white text-sm font-medium"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="bg-green-800/30 border-green-700 text-white placeholder:text-green-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-white text-sm font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="bg-green-800/30 border-green-700 text-white placeholder:text-green-300 focus:border-green-500 focus:ring-green-500 pr-10"
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-300 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                      className="border-green-600 data-[state=checked]:bg-green-600"
                    />
                    <Label htmlFor="remember" className="text-green-200 text-sm">
                      Remember Me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-green-400 text-sm hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {loading ? "Logging in..." : "Login Now"}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Panel - Image */}
          <div className="w-1/2">
            <Image
              src={loginImg}
              alt="Professional team collaborating in modern office"
              className="object-cover h-full w-full rounded-tr-3xl rounded-br-3xl"
              priority
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
