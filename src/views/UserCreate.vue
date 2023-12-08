<template>
  <div>
    <p class="text-3xl text-slate-600 mb-8">Add user</p>
    <UserForm save-label="Update Details" type="create" />
  </div>
</template>

<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
</script>
