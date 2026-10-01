'use client';

import React from 'react';
import { usePayrollStore } from '@/store/usePayrollStore';
import { Building2, Banknote } from 'lucide-react';

export const SlipDocument = () => {
  const store = usePayrollStore();

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID').format(num);
  const totalPay = store.baseSalary + store.allowance - store.deduction;

  return (
    <div className="lg:col-span-7 flex justify-center w-full">
      <div className="print-container bg-white w-full max-w-[680px] rounded-[24px] p-8 md:p-10 shadow-xl border border-slate-200/80 relative text-slate-900">
        
        {/* HEADER DOKUMEN */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b-2 border-slate-900">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase">
              {store.company}
            </h1>
            <p className="text-sm font-medium text-slate-600 mt-0.5">{store.subCompany}</p>
            <p className="text-xs text-slate-500 mt-0.5">{store.address}</p>
          </div>
          <div className="flex flex-col items-end sm:self-start">
            <div className="px-3 py-1 bg-[#e4f7f0] border border-[#a3ebd2] rounded-lg">
              <span className="text-[11px] font-bold text-[#147a5a] tracking-wide uppercase">
                {store.badge}
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-700 mt-2">
              REF: <span>{store.refNumber}</span>
            </p>
          </div>
        </div>

        {/* DATA KARYAWAN */}
        <div className="mt-6 bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">NAMA KARYAWAN:</p>
                <p className="text-base font-extrabold text-slate-900 tracking-tight mt-0.5">{store.empName}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">PERIODE GAJI:</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">{store.period}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">JABATAN:</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">{store.jobTitle}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">NO. KONTAK / METODE:</p>
                <p className="text-sm font-semibold text-slate-800 mt-0.5 flex items-center gap-2">
                  <span>{store.phone}</span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    {store.paymentMethod === 'Cash / Tunai' ? (
                      <><Banknote className="w-3.5 h-3.5" /> Cash / Tunai</>
                    ) : (
                      <><Building2 className="w-3.5 h-3.5" /> Transfer Bank</>
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RINCIAN KOMPONEN GAJI */}
        <div className="mt-8 space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">RINCIAN KOMPONEN PENGHASILAN:</h3>
          <div className="space-y-3.5 text-sm md:text-base">
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-700 font-medium">Gaji Pokok</span>
              <span className="font-mono font-bold text-slate-900">Rp {formatRupiah(store.baseSalary)}</span>
            </div>
            <div className="border-b border-slate-100" />
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-700 font-medium">Tunjangan / Insentif Lapangan</span>
              <span className="font-mono font-bold text-[#147a5a]">+ Rp {formatRupiah(store.allowance)}</span>
            </div>
            <div className="border-b border-slate-100" />
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-700 font-medium">Potongan / Kasbon</span>
              <span className="font-mono font-bold text-rose-600">- Rp {formatRupiah(store.deduction)}</span>
            </div>
          </div>
          <div className="border-b-2 border-slate-900 my-4" />
          <div className="flex justify-between items-center pt-1 pb-2">
            <span className="text-sm md:text-base font-extrabold text-slate-900 tracking-tight uppercase">
              TOTAL GAJI BERSIH (TAKE HOME PAY)
            </span>
            <span className="text-lg md:text-xl font-mono font-extrabold text-[#147a5a]">
              Rp {formatRupiah(totalPay)}
            </span>
          </div>
          <div className="border-b border-slate-200" />
        </div>

        {/* TANDA TANGAN & PENGESAHAN */}
        <div className="mt-14 pt-2 grid grid-cols-2 gap-4 items-end text-center">
          <div className="flex flex-col items-center">
            <p className="text-xs font-semibold text-slate-600 mb-14">Penerima (Karyawan),</p>
            <div className="w-44 border-b border-slate-400 pb-1">
              <p className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wider">{store.empName}</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-xs font-semibold text-slate-600 mb-1">Disetujui oleh Owner,</p>
            <div className="w-48 h-20 relative flex items-center justify-center my-1">
              {store.sigMode === 'vector' && (
                <svg className="w-40 h-24" viewBox="0 0 140 90" fill="none">
                  <g stroke={store.inkColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 36 48 L 18 58 L 30 74 L 50 62 Z" />
                    <path d="M 18 58 L 50 62" strokeWidth="2.6" />
                    <path d="M 38 72 L 38 18" strokeWidth="3.2" />
                    <path d="M 47 18 L 47 50" />
                    <path d="M 47 50 C 52 42, 58 42, 62 48" strokeWidth="2.8" />
                    <path d="M 62 48 C 66 32, 78 30, 80 45 C 82 58, 85 70, 78 78 C 70 85, 62 76, 72 62 L 92 42" />
                    <circle cx="72" cy="11" r="3.2" fill={store.inkColor} />
                  </g>
                </svg>
              )}
              {store.sigMode === 'stamp' && (
                <div className="relative flex items-center justify-center w-full h-full">
                  <svg className="w-32 h-16 text-[#046c4e] opacity-80 absolute" viewBox="0 0 160 50" fill="none">
                    <ellipse cx="80" cy="25" rx="72" ry="20" stroke="currentColor" strokeWidth="2.2" fill="none" />
                    <ellipse cx="80" cy="25" rx="66" ry="16" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" fill="none" />
                  </svg>
                  <svg className="w-36 h-20 relative z-10" viewBox="0 0 140 90" fill="none">
                    <g stroke={store.inkColor} strokeWidth="3" strokeLinecap="round">
                      <path d="M 36 48 L 18 58 L 30 74 L 50 62 Z" />
                      <path d="M 38 72 L 38 18" />
                      <path d="M 62 48 C 66 32, 78 30, 80 45 C 82 58, 85 70, 78 78 C 70 85, 62 76, 72 62 L 92 42" />
                    </g>
                  </svg>
                </div>
              )}
              {store.sigMode === 'upload' && store.uploadedSigUrl && (
                <img src={store.uploadedSigUrl} alt="Tanda Tangan Upload" className="max-h-16 object-contain" />
              )}
              {store.sigMode === 'draw' && store.drawnSigUrl && (
                <img src={store.drawnSigUrl} alt="Coretan Canvas" className="max-h-16 object-contain" />
              )}
            </div>

            <div className="w-44 border-b border-slate-300 pb-0.5">
              <p className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wider">{store.ownerName}</p>
            </div>
            <p className="text-[10px] font-mono font-bold text-[#147a5a] tracking-wider mt-1">{store.parafText}</p>
          </div>
        </div>

        {/* FOOTER DOKUMEN */}
        <div className="mt-10 pt-3 border-t border-dashed border-slate-200 text-center">
          <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
            Sistem Slip Gaji Digital &bull; Dibuat oleh <span className="font-semibold text-slate-600">IT Garintiman Jaya</span> (Inisial: <span className="font-bold text-emerald-700">Y-Two</span>)
          </p>
        </div>
      </div>
    </div>
  );
};