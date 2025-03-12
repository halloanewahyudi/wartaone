<template>
    <div class="container">
        
        <div class="flex flex-col min-h-[80vh] justify-center items-center">
            <h1 class="text-xl font-bold mb-4">Export Data Pemudik</h1>
            <div class="flex gap-4 flex-wrap items-center justify-center">
                <ExportData />
                <router-link to="/entries" class="btn">🏠 Kembali ke entries</router-link>
            </div>
        </div>

    </div>
</template>

<script setup>
import ExportData from '../components/ExportData.vue';
</script>