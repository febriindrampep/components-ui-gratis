// components/HeroSimple.tsx
'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center !bg-black pt-20 md:pt-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge kecil */}
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm !text-gray-400">
          ✨ Free Component
        </div>

        {/* Judul utama */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold !text-white leading-tight">
          Ini adalah components navbar gratis
        </h1>

        {/* Subjudul */}
        <p className="mt-4 text-base sm:text-lg !text-gray-300 max-w-2xl mx-auto">
          Kunjungi lebih banyak components gratis di GitHub
        </p>

        {/* Tombol aksi */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="https://github.com/your-username/your-repo" // ganti dengan link GitHub Anda
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-3.5 rounded-lg text-sm font-semibold !text-white overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              Lihat di GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Footer kecil */}
        <p className="mt-6 text-xs !text-gray-500">
          Next.js 16 • Tailwind CSS v4 • TypeScript
        </p>
      </div>
    </section>
  );
}