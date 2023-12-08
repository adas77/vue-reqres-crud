<template>
  <div class="min-h-screen flex justify-center items-center lg:items-start bg-slate-100">
    <div class="w-11/12 items-center lg:mt-20">
      <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
