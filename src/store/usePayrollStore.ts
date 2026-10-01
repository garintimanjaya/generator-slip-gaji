import { create } from 'zustand';

export type SigMode = 'vector' | 'stamp' | 'upload' | 'draw';

interface PayrollState {
  // Informasi Perusahaan & Slip
  company: string;
  subCompany: string;
  address: string;
  badge: string;
  refNumber: string;

  // Data Karyawan & Periode
  empName: string;
  period: string;
  jobTitle: string;
  phone: string;
  paymentMethod: string;

  // Rincian Keuangan
  baseSalary: number;
  allowance: number;
  deduction: number;

  // Pengesahan & Tanda Tangan Digital
  ownerName: string;
  sigMode: SigMode;
  inkColor: string;
  parafText: string;
  threshold: number;
  contrast: number;
  uploadedSigUrl: string | null;
  drawnSigUrl: string | null;

  // Actions / Reducers
  setField: <K extends keyof PayrollState>(field: K, value: PayrollState[K]) => void;
  setRefNumber: (ref: string) => void;
  resetDefaults: () => void;
}

const MONTH_NAMES: Record<string, string> = {
  '01': 'Januari', '02': 'Februari', '03': 'Maret', '04': 'April',
  '05': 'Mei', '06': 'Juni', '07': 'Juli', '08': 'Agustus',
  '09': 'September', '10': 'Oktober', '11': 'November', '12': 'Desember'
};

export const usePayrollStore = create<PayrollState>((set) => ({
  // Default State Values
  company: 'CV GARINTIMAN DIGITAL',
  subCompany: 'Koperasi Pembiayaan & Mitra Usaha Lapangan',
  address: 'Jl. Raya Koperasi No. 88, Wilayah Kerja Area 1',
  badge: 'SLIP GAJI RESMI',
  refNumber: 'SLIP/2026/08/001',

  empName: 'JHON DOE',
  period: 'Agustus 2026',
  jobTitle: 'Petugas Lapangan',
  phone: '+6281271243224',
  paymentMethod: 'Transfer Bank',

  baseSalary: 3500000,
  allowance: 2100000,
  deduction: 0,

  ownerName: 'MUHAMMAD YAHYA',
  sigMode: 'vector',
  inkColor: '#0f2b5c',
  parafText: '[ TEROTORISASI DIGITAL SAH ]',
  threshold: 175,
  contrast: 1.6,
  uploadedSigUrl: null,
  drawnSigUrl: null,

  // Action untuk update field generik
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),

  // Action khusus No. Referensi (Otomatis memperbarui Periode Gaji via Regex)
  setRefNumber: (refNumber) => set((state) => {
    let period = state.period;
    const match = refNumber.match(/\/(\d{4})\/(\d{2})\//) || refNumber.match(/(\d{4})[\/\-](\d{2})/);
    
    if (match) {
      const year = match[1];
      const monthNum = match[2];
      if (MONTH_NAMES[monthNum]) {
        period = `${MONTH_NAMES[monthNum]} ${year}`;
      }
    }
    return { ...state, refNumber, period };
  }),

  // Reset ke nilai awal
  resetDefaults: () => set({
    company: 'CV GARINTIMAN DIGITAL',
    subCompany: 'Koperasi Pembiayaan & Mitra Usaha Lapangan',
    address: 'Jl. Budiutomo No. 8888, Wilayah Kerja Area 1',
    badge: 'SLIP GAJI RESMI',
    refNumber: 'SLIP/2026/08/001',
    empName: 'JHON DOE',
    period: 'Agustus 2026',
    jobTitle: 'Petugas Lapangan',
    phone: '+6281271243224',
    paymentMethod: 'Transfer Bank',
    baseSalary: 3500000,
    allowance: 2100000,
    deduction: 0,
    ownerName: 'MUHAMMAD YAHYA',
    sigMode: 'vector',
    inkColor: '#0f2b5c',
    parafText: '[ TEROTORISASI DIGITAL SAH ]',
    threshold: 175,
    contrast: 1.6,
    uploadedSigUrl: null,
    drawnSigUrl: null,
  }),
}));