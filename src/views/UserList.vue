<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error...</span>
  <div v-else>
    <p class="text-3xl text-slate-600 mb-8">User list</p>
    <UsersTable :users="data" :page="page" :update-page="updatePage" />
  </div>
</template>

<script setup lang="ts">
import { QueryKeys } from '@/api/queries'
import serviceUsers from '@/api/users'
import UsersTable from '@/components/UsersTable.vue'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

const page = ref(1)
const updatePage = (newPage: number) => (page.value = newPage)

const { isLoading, isError, data } = useQuery({
  queryKey: [QueryKeys.USERS, page],
  queryFn: () => serviceUsers.getAll(page.value)
})
</script>
