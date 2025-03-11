<template>
  <div class="flex fle-col justify-center items-center min-h-screen">
    <div class=" text-center">
        <h2 class="text-3xl font-medium">Terimakasih {{ route.params.nama }}</h2>
        <p class="">Form anda telah terkirim</p>
        <p>Semoga Allah melindungi anda</p>
    </div>
  </div>
</template>

<script setup>
  import { useRouter,useRoute } from 'vue-router';
   const router = useRouter()
   const route = useRoute()
</script>

<style>

</style>