<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error...</span>
  <div v-else>
    <p class="text-3xl text-slate-600 mb-8">Update user</p>
    <UserForm :user="data" type="update" save-label="Update Details" />
  </div>
</template>

<script setup lang="ts">
import { QueryKeys } from '@/api/queries'
import serviceUsers from '@/api/users'
import UserForm from '@/components/UserForm.vue'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref<string>(
  Array.isArray(route.params.id) ? route.params.id[0] : (route.params.id as string)
)
const { isLoading, isError, data } = useQuery({
  queryKey: [QueryKeys.USER, id],
  queryFn: () => serviceUsers.getByID(id.value)
})
</script>
