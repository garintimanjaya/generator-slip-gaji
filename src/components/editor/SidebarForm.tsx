'use client';

import React from 'react';
import { usePayrollStore, SigMode } from '@/store/usePayrollStore';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import { CanvasPad } from './CanvasPad';
import { Building, UserRoundCog, Calculator, Signature, Eraser, Zap, Wand2 } from 'lucide-react';

export const SidebarForm = () => {
  const store = usePayrollStore();
  const { processImage } = useImageProcessor();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const processed = processImage(img, store.threshold, store.contrast, store.inkColor);
        store.setField('uploadedSigUrl', processed);
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="lg:col-span-5 space-y-5 no-print">
      {/* Card 1: Informasi Perusahaan */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
        <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <Building className="w-4 h-4 text-emerald-600" /> Informasi Perusahaan & Slip
        </h2>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Nama Perusahaan</label>
            <input
              type="text"
              value={store.company}
              onChange={(e) => store.setField('company', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-semibold"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Sub-nama Perusahaan</label>
            <input
              type="text"
              value={store.subCompany}
              onChange={(e) => store.setField('subCompany', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Alamat Perusahaan</label>
            <input
              type="text"
              value={store.address}
              onChange={(e) => store.setField('address', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Judul Badge</label>
              <input
                type="text"
                value={store.badge}
                onChange={(e) => store.setField('badge', e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none uppercase font-semibold"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">No. Referensi</label>
              <input
                type="text"
                value={store.refNumber}
                onChange={(e) => store.setRefNumber(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Data Karyawan */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
        <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <UserRoundCog className="w-4 h-4 text-emerald-600" /> Data Karyawan & Periode Gaji
        </h2>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Nama Karyawan</label>
            <input
              type="text"
              value={store.empName}
              onChange={(e) => store.setField('empName', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-bold uppercase"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Periode Gaji <span className="text-[10px] text-emerald-600 font-normal">(Otomatis)</span>
              </label>
              <input
                type="text"
                value={store.period}
                onChange={(e) => store.setField('period', e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-semibold"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Jabatan</label>
              <input
                type="text"
                value={store.jobTitle}
                onChange={(e) => store.setField('jobTitle', e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-semibold"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-slate-700 mb-1">No. Kontak / HP</label>
              <input
                type="text"
                value={store.phone}
                onChange={(e) => store.setField('phone', e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Metode Pembayaran</label>
              <select
                value={store.paymentMethod}
                onChange={(e) => store.setField('paymentMethod', e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-semibold text-emerald-800"
              >
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="Cash / Tunai">Cash / Tunai</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Rincian Keuangan */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
        <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-600" /> Rincian Penghasilan & Potongan
        </h2>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Gaji Pokok (Rp)</label>
            <input
              type="number"
              value={store.baseSalary}
              onChange={(e) => store.setField('baseSalary', Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Tunjangan / Insentif Lapangan (Rp)</label>
            <input
              type="number"
              value={store.allowance}
              onChange={(e) => store.setField('allowance', Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Potongan / Kasbon (Rp)</label>
            <input
              type="number"
              value={store.deduction}
              onChange={(e) => store.setField('deduction', Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Card 4: Pengesahan & Tanda Tangan */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <Signature className="w-4 h-4 text-emerald-600" /> Pengesahan & Tanda Tangan Digital
        </h2>
        <div className="grid grid-cols-1 gap-3 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Nama Owner / Pengesah</label>
            <input
              type="text"
              value={store.ownerName}
              onChange={(e) => store.setField('ownerName', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-semibold"
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 mb-1">Mode Tanda Tangan Owner</label>
            <select
              value={store.sigMode}
              onChange={(e) => store.setField('sigMode', e.target.value as SigMode)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
            >
              <option value="vector">Tanda Tangan Asli Digital (Vektor V582)</option>
              <option value="stamp">Stempel Paraf Digital + Tanda Tangan</option>
              <option value="upload">Unggah Foto Tanda Tangan (PNG/JPG)</option>
              <option value="draw">Coret / Gambar Langsung di Layar</option>
            </select>
          </div>

          {/* Pilih Warna Tinta */}
          <div className="flex items-center justify-between pt-1">
            <label className="font-medium text-slate-700">Warna Tinta Pen:</label>
            <div className="flex gap-2">
              <button
                onClick={() => store.setField('inkColor', '#0f2b5c')}
                className="w-6 h-6 rounded-full bg-[#0f2b5c] ring-2 ring-offset-1 ring-slate-300 hover:scale-110 transition-transform"
                title="Biru Tinta"
              />
              <button
                onClick={() => store.setField('inkColor', '#111827')}
                className="w-6 h-6 rounded-full bg-slate-900 ring-2 ring-offset-1 ring-slate-300 hover:scale-110 transition-transform"
                title="Hitam Pekat"
              />
              <button
                onClick={() => store.setField('inkColor', '#046c4e')}
                className="w-6 h-6 rounded-full bg-emerald-700 ring-2 ring-offset-1 ring-slate-300 hover:scale-110 transition-transform"
                title="Hijau Perusahaan"
              />
            </div>
          </div>

          {/* Controls Unggah Tanda Tangan */}
          {store.sigMode === 'upload' && (
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Pilih File Tanda Tangan (JPG/PNG)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                  <span className="flex items-center gap-1"><Eraser className="w-3.5 h-3.5 text-emerald-600" /> Hapus Background:</span>
                  <span className="font-mono text-emerald-700">{store.threshold}</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="240"
                  value={store.threshold}
                  onChange={(e) => store.setField('threshold', Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 pt-1">
                  <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-emerald-600" /> Ketajaman Line:</span>
                  <span className="font-mono text-emerald-700">{store.contrast}</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="3.0"
                  step="0.1"
                  value={store.contrast}
                  onChange={(e) => store.setField('contrast', Number(e.target.value))}
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 flex items-center gap-1 pt-1 border-t border-slate-200">
                  <Wand2 className="w-3 h-3 text-emerald-600" /> Transparansi latar belakang kertas aktif otomatis.
                </p>
              </div>
            </div>
          )}

          {/* Draw Canvas Input */}
          {store.sigMode === 'draw' && <CanvasPad />}

          <div>
            <label className="block font-medium text-slate-700 mb-1">Teks Badge Validasi Digital</label>
            <input
              type="text"
              value={store.parafText}
              onChange={(e) => store.setField('parafText', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
};