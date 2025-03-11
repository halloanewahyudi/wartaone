<script setup>
import { ref, computed } from 'vue';

const data = [
  { bulan: 'Maret', tanggal: Array.from({ length: 31 }, (_, i) => (i + 1).toString()) },
  { bulan: 'April', tanggal: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
  { bulan: 'Mei', tanggal: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) }
];

const selectedMonth = ref(null);
const selectedDate = ref(null);

const availableDates = computed(() => {
  const month = data.find(m => m.bulan === selectedMonth.value);
  return month ? month.tanggal : [];
});
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <label class="block text-gray-700">Pilih Bulan:</label>
    <input 
      v-model="selectedMonth" 
      list="bulan-list" 
      class="border p-2 w-full rounded" 
      placeholder="Pilih bulan" />
    <datalist id="bulan-list">
      <option v-for="bulan in data" :key="bulan.bulan" :value="bulan.bulan"></option>
    </datalist>
    
    <label class="block text-gray-700 mt-4">Pilih Tanggal:</label>
    <input 
      v-model="selectedDate" 
      list="tanggal-list" 
      class="border p-2 w-full rounded" 
      :disabled="!selectedMonth" 
      placeholder="Pilih tanggal" />
    <datalist id="tanggal-list">
      <option v-for="tanggal in availableDates" :key="tanggal" :value="tanggal"></option>
    </datalist>

    <div v-if="selectedMonth && selectedDate" class="mt-4 p-4 bg-green-100 rounded">
      <p class="text-green-700 font-semibold">Anda memilih: {{ selectedMonth }} - {{ selectedDate }}</p>
    </div>
  </div>
</template>

<style>
  input:disabled {
    background-color: #e5e7eb;
    cursor: not-allowed;
  }
</style>
