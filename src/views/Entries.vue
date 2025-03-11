<template>
    <div class="container">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-xl font-bold mb-4">Data Pemudik</h1>
            <router-link to="/Export" class="btn">Download</router-link>
        </div>
      

        <!-- Search Bar -->
        <input type="search" v-model="searchQuery" placeholder="Cari berdasarkan nama atau tujuan..."
            class="input mb-4 w-full rounded-full" />

        <!-- Menampilkan loading -->
        <p v-if="loading">Loading data...</p>

        <!-- Menampilkan jika tidak ada hasil pencarian -->
        <p v-else-if="filteredPemudikList.length === 0">Tidak ada data yang cocok.</p>

        <!-- Menampilkan data pemudik -->
        <div v-else>
            <div v-for="(pemudik, index) in paginatedPemudikList" :key="index"
                class=" rounded-xl shadow mb-4 bg-light/10 overflow-hidden">
                <div class="flex items-center justify-between py-2 bg-secondary px-4">
                    <h2 class="text-lg font-semibold">{{ pemudik.nama }}</h2>
                    <div>
                        {{ pemudik.alamat.blok }} No. {{ pemudik.alamat.no_blok }} - {{ pemudik.alamat.no_rumah }}
                    </div>
                </div>
                <div class="p-4 text-sm">
                    <div class="flex flex-col gap-1">
                        <span>Tujuan : {{ pemudik.tujuan }}</span>
                        <span>Berangkat : {{ formatTanggal(pemudik.berangkat) }}</span>
                        <span>Pulang : {{ formatTanggal(pemudik.pulang) }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span> Ada yang tinggal di rumah : {{ pemudik.ada_yang_tinggal ? "Ya" : "Tidak" }}</span>
                        <span> Keterangan :  {{ pemudik.keterangan || "-" }}</span>
                    </div>
                </div>

            </div>

            <!-- Pagination -->
            <div class="flex justify-center items-center gap-2 mt-4">
                <button @click="prevPage" :disabled="currentPage === 1" class="btn">❮ </button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="btn"> ❯</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

import { format } from "date-fns"; // Pastikan `date-fns` sudah terinstal
import { id } from "date-fns/locale"; // Gunakan bahasa Indonesia

const pemudikList = ref([]);
const loading = ref(true);
const searchQuery = ref("");

// Pagination
const itemsPerPage = 10;
const currentPage = ref(1);

const formatTanggal = (tanggal: any) => {
    if (!tanggal) return "Tanggal tidak tersedia";

    let parsedDate;

    // Jika Firestore Timestamp, ubah ke Date
    if (tanggal.seconds) {
        parsedDate = new Date(tanggal.seconds * 1000);
    }
    // Jika string (misalnya dari Firestore Console), tetap coba parse
    else {
        parsedDate = new Date(tanggal);
    }

    if (isNaN(parsedDate.getTime())) return "Format tanggal salah"; // Cek apakah valid

    return format(parsedDate, "EEEE, dd MMMM yyyy", { locale: id }); // Format ke "Senin, 13 Maret 2025"
};

// Fetch data dari Firestore
const fetchData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "mudik"));
        pemudikList.value = querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
        console.error("Error fetching data: ", error);
    } finally {
        loading.value = false;
    }
};


// Filter berdasarkan searchQuery
const filteredPemudikList = computed(() => {
    if (!searchQuery.value) return pemudikList.value;
    return pemudikList.value.filter(
        (pemudik) =>
            pemudik.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            pemudik.tujuan.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Hitung total halaman
const totalPages = computed(() => Math.ceil(filteredPemudikList.value.length / itemsPerPage));

// Data yang ditampilkan berdasarkan halaman saat ini
const paginatedPemudikList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredPemudikList.value.slice(start, start + itemsPerPage);
});

// Fungsi untuk pagination
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

onMounted(fetchData);
</script>

<style>
.container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

.btn {
    color:var(--color-tertiary);
}

.btn:disabled {
    background-color: var(--color-primary-light);
    opacity: 0.3;
}
</style>