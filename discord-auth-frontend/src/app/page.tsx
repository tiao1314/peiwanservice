"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    global_name?: string;
    email?: string;
}

export default function Home() {
    const [user, setUser] = useState<DiscordUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5050/auth/user", { withCredentials: true })
            .then((response) => {
                if (response.data.id) {
                    setUser(response.data);
                }
            })
            .catch((error) => console.error("Error fetching user data:", error))
            .finally(() => setLoading(false));
    }, []);

    const handleLogin = () => {
        window.location.href = "http://localhost:5050/auth/discord";
    };

    const handleLogout = () => {
        axios
            .get("http://localhost:5050/auth/logout", { withCredentials: true })
            .then(() => setUser(null))
            .catch((error) => console.error("Logout error:", error));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <main className="flex flex-col items-center gap-8 text-center">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />

                {loading ? (
                    <p>Loading...</p>
                ) : user ? (
                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                            alt="User Avatar"
                            width={100}
                            height={100}
                            className="rounded-full shadow-lg"
                        />
                        <h2 className="text-lg font-semibold">{user.global_name || user.username}</h2>
                        <p className="text-sm text-gray-500">{user.email || "No email available"}</p>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition font-medium"
                    >
                        Login with Discord
                    </button>
                )}
            </main>

            <footer className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
                <a
                    href="https://nextjs.org/learn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Learn Next.js
                </a>
                <a
                    href="https://vercel.com/templates?framework=next.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Browse Templates
                </a>
                <a
                    href="https://nextjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Visit Next.js →
                </a>
            </footer>
        </div>
    );
}