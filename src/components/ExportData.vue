<template>
    <div class="flex flex-wrap gap-4 items-center justify-center">
      <button @click="downloadCSV" class="btn">📥 Download CSV</button>
      <button @click="downloadExcel" class="btn">📥 Download Excel</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../firebase';
  import Papa from "papaparse";
  import * as XLSX from "xlsx";
  import { saveAs } from "file-saver";
  
  const pemudikList = ref([]);
  
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "mudik"));
    pemudikList.value = querySnapshot.docs.map(doc => doc.data());
  };
  
  const downloadCSV = () => {
    const csvData = pemudikList.value.map(pemudik => ({
      Nama: pemudik.nama,
      Tujuan: pemudik.tujuan,
      Berangkat: pemudik.berangkat.seconds ? new Date(pemudik.berangkat.seconds * 1000).toLocaleDateString('id-ID') : '',
      Pulang: pemudik.pulang.seconds ? new Date(pemudik.pulang.seconds * 1000).toLocaleDateString('id-ID') : '',
      "Ada Yang Tinggal di Rumah": pemudik.ada_yang_tinggal ? "Ya" : "Tidak",
      Keterangan: pemudik.keterangan || "-",
    }));
  
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data_pemudik.csv");
  };
  
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(pemudikList.value.map(pemudik => ({
      Nama: pemudik.nama,
      Tujuan: pemudik.tujuan,
      Berangkat: pemudik.berangkat.seconds ? new Date(pemudik.berangkat.seconds * 1000).toLocaleDateString('id-ID') : '',
      Pulang: pemudik.pulang.seconds ? new Date(pemudik.pulang.seconds * 1000).toLocaleDateString('id-ID') : '',
      "Ada Yang Tinggal di Rumah": pemudik.ada_yang_tinggal ? "Ya" : "Tidak",
      Keterangan: pemudik.keterangan || "-",
    })));
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Pemudik");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(blob, "data_pemudik.xlsx");
  };
  
  onMounted(fetchData);
  </script>
  