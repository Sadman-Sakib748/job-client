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
import { Eye, EyeOff, X } from "lucide-react"; // import icons
import loginImg from '../../../public/login.jpg'; // import image

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
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

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        await signIn("google", { callbackUrl: "/products" });
        setGoogleLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <Card className="w-full max-w-5xl bg-[#071400] rounded-3xl shadow-2xl overflow-hidden relative">
                {/* Close Button - Top Right */}
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
                                Don't have an account?{" "}
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

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={rememberMe}
                                            onCheckedChange={setRememberMe}
                                            className="border-green-600 data-[state=checked]:bg-green-600"
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="text-green-200 text-sm"
                                        >
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

                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 h-px bg-green-700"></div>
                                <span className="px-4 text-green-300 text-sm">Or</span>
                                <div className="flex-1 h-px bg-green-700"></div>
                            </div>

                            {/* Social Login */}
                            <div className="flex justify-center space-x-4">
                                <button className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                                    {/* Google Icon */}
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                                {/* Github Icon */}
                                <button className="w-12 h-12 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </button>
                            </div>
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
