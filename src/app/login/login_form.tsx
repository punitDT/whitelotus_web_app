"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "admin@fintech.com",
            password: "Pass@1234",
        },
    });

    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true);
        try {
            // Example: Call your API route
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Invalid credentials");

            alert("Login successful ✅");
        } catch (err: any) {
            alert(err.message || "Login failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto mt-10 space-y-4 p-6 border rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-semibold text-center">Login</h2>

            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    {...register("email")}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter your email"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Password with toggle */}
            <div>
                <label className="block text-sm font-medium">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 pr-10"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
