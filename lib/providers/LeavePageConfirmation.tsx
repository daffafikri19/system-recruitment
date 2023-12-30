"use client"
import React, { useEffect } from 'react';

const LeavePageConfirmation = () => {
  useEffect(() => {
    const handleBeforeUnload = (event : any) => {
      event.preventDefault();
      // Membuat pesan konfirmasi
      const confirmationMessage = 'Apakah Anda yakin ingin meninggalkan halaman ini? Perubahan yang belum disimpan akan hilang.';
      // Menetapkan pesan konfirmasi ke event
      event.returnValue = confirmationMessage;
      // Mengembalikan pesan konfirmasi
      return confirmationMessage;
    };

    // Menambahkan event listener untuk beforeunload event
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Membersihkan event listener saat komponen dilepas
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <></>; // Komponen kosong, hanya digunakan untuk menetapkan event listener
};

export default LeavePageConfirmation;