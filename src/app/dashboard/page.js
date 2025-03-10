'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') { // Pastikan hanya berjalan di client
            const loggedInUser = localStorage.getItem('user');
            if (!loggedInUser) {
                router.push('/login');
            } else {
                setUser(JSON.parse(loggedInUser));
            }
        }
    }, [router]);

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96 text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h2>
                {user ? (
                    <p className="text-gray-700">Selamat datang, {user.email}!</p>
                ) : (
                    <p className="text-gray-500">Memuat...</p>
                )}
                <button
                    onClick={() => {
                        localStorage.removeItem('user'); // Hapus user dari localStorage
                        router.push('/login');
                    }}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition font-semibold"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}