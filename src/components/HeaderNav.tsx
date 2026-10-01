'use client';

import React, { useState } from 'react';
import { usePayrollStore } from '@/store/usePayrollStore';
import { FileText, RotateCcw, Printer, Save, Loader2, Download } from 'lucide-react';

export const HeaderNav = () => {
  const store = usePayrollStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Function untuk menyimpan data ke database via API secara aman
  const handleSaveToDatabase = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/payroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      });

      // Cek apakah response tidak OK (HTTP Error page 404 / 500)
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Response Error:', errorText);
        alert(`❌ Gagal menyimpan (HTTP ${response.status}). Periksa koneksi Database / Server Log di terminal VS Code.`);
        return;
      }

      const result = await response.json();

      if (result.success) {
        alert('✅ Slip Gaji berhasil disimpan ke Database!');
      } else {
        alert('❌ Gagal menyimpan: ' + result.error);
      }
    } catch (error: any) {
      console.error(error);
      alert('❌ Terjadi kesalahan koneksi ke server: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Function untuk mendownload PDF dari Server (Puppeteer)
  const handleDownloadPDF = async () => {
    setIsDownloadingPdf(true);
    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      });

      if (!response.ok) throw new Error('Gagal memproses PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Slip_Gaji_${store.empName.replace(/\s+/g, '_')}_${store.refNumber.replace(/\//g, '-')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      alert('❌ Gagal mengunduh berkas PDF dari server.');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <header className="max-w-7xl mx-auto mb-6 no-print flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl font-bold">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-tight">Generator Slip Gaji Digital</h1>
          <p className="text-xs text-slate-500">Edit data di sebelah kiri, pratinjau slip gaji otomatis diperbarui di sebelah kanan.</p>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        {/* Tombol Reset */}
        <button
          onClick={store.resetDefaults}
          className="px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Data
        </button>

        {/* Tombol Simpan Database */}
        <button
          onClick={handleSaveToDatabase}
          disabled={isSaving}
          className="px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Simpan ke DB
        </button>

        {/* Tombol Download PDF Server-Side */}
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloadingPdf}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          {isDownloadingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
          Download PDF
        </button>

        {/* Tombol Cetak Langsung Browser */}
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Cetak / Print
        </button>
      </div>
    </header>
  );
};