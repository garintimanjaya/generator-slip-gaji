'use client';

import { HeaderNav } from '@/components/HeaderNav';
import { SidebarForm } from '@/components/editor/SidebarForm';
import { SlipDocument } from '@/components/preview/SlipDocument';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 md:p-8">
      {/* Navigation Header */}
      <HeaderNav />

      {/* Grid Utama (Dual-Pane) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Sidebar (Kiri) */}
        <SidebarForm />

        {/* Live Preview Slip (Kanan) */}
        <SlipDocument />
      </div>

      {/* Footer Halaman Web */}
      <footer className="max-w-7xl mx-auto mt-8 text-center text-xs text-slate-500 no-print pb-6">
        <p>
          Aplikasi Generator Slip Gaji Digital &copy; 2026 &bull; Dikembangkan oleh{' '}
          <strong className="text-slate-700">IT Garintiman Jaya</strong> (Inisial:{' '}
          <strong className="text-emerald-700">Y-Rtwo</strong>)
        </p>
      </footer>
    </div>
  );
}