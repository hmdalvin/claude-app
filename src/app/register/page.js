'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleRegister = (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Password dan konfirmasi password tidak cocok!');
            return;
        }

        // Simulasi penyimpanan user (sebaiknya gunakan database di aplikasi nyata)
        localStorage.setItem('user', JSON.stringify({ email }));
        router.push('/dashboard');
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gradient-to-r from-green-500 to-blue-600">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Daftar</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-gray-900"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-gray-900"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Konfirmasi Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition text-gray-900"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold"
                    >
                        Daftar
                    </button>
                </form>
                <p className="text-sm text-gray-600 text-center mt-4">
                    Sudah punya akun? <a href="/login" className="text-green-500 hover:underline">Masuk</a>
                </p>
            </div>
        </div>
    );
}
