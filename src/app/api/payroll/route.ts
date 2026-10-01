import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Hitung total gaji bersih (Take Home Pay)
    const baseSalary = Number(data.baseSalary) || 0;
    const allowance = Number(data.allowance) || 0;
    const deduction = Number(data.deduction) || 0;
    const netPay = baseSalary + allowance - deduction;

    // Simpan data ke database Supabase menggunakan Prisma
    const savedRecord = await prisma.payroll.create({
      data: {
        company: data.company || '',
        subCompany: data.subCompany || '',
        address: data.address || '',
        badge: data.badge || '',
        refNumber: data.refNumber || '',
        empName: data.empName || '',
        period: data.period || '',
        jobTitle: data.jobTitle || '',
        phone: data.phone || '',
        paymentMethod: data.paymentMethod || '',
        baseSalary,
        allowance,
        deduction,
        netPay,
        ownerName: data.ownerName || '',
        parafText: data.parafText || '',
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Slip Gaji berhasil disimpan ke Database Supabase!',
      data: savedRecord 
    });
  } catch (error: any) {
    console.error('Error saving to Database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menyimpan ke database' },
      { status: 500 }
    );
  }
}