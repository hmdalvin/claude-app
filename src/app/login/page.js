'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);

        // Ambil data user dari localStorage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            setError('Akun tidak ditemukan! Silakan daftar terlebih dahulu.');
            return;
        }

        const user = JSON.parse(storedUser);
        if (email === user.email && password) {
            router.push('/dashboard');
        } else {
            setError('Email atau password salah!');
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-gray-900"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-gray-900"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-gray-600 text-center mt-4">
                    Belum punya akun? <a href="/register" className="text-blue-500 hover:underline">Daftar</a>
                </p>
            </div>
        </div>
    );
}
