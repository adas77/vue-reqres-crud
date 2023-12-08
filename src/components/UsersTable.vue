<template>
  <div class="overflow-x-auto bg-white p-3 lg:p-5 rounded-lg shadow-md">
    <div class="flex items-center justify-between py-2 lg:py-4 mb-3 gap-2">
      <div class="flex items-center justify-between rounded-md shadow-sm bg-slate-100">
        <input
          type="text"
          class="w-full lg:w-96 px-2 lg:px-4 py-1 rounded-md focus:outline-none bg-inherit placeholder:text-slate-500"
          placeholder="Search for users..."
        />
        <button class="flex items-center justify-center px-4">
          <Icon icon="mdi:search" class="text-lg text-slate-600" />
        </button>
      </div>
      <router-link :to="{ name: Routes.USER_CREATE.name }"
        ><button
          class="flex items-center gap-2 justify-center bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-2 lg:py-3 px-4 lg:mr-6 rounded-full shadow-md text-xs whitespace-nowrap"
        >
          <Icon icon="mdi:plus" class="text-lg text-white" />
          Add User
        </button></router-link
      >
    </div>
    <hr class="border border-slate-100" />
    <table class="table mb-2">
      <thead>
        <tr class="text-slate-600 text-sm">
          <th class="w-1/12"></th>
          <th class="w-10/12">Full Name</th>
          <th class="w-1/12">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in props.users" :key="u.id" class="bg-white even:bg-white odd:bg-slate-100">
          <th>
            <div class="flex items-center avatar">
              <div class="w-10 rounded-full">
                <img :src="u.avatar" :alt="u.avatar" />
              </div>
            </div>
          </th>
          <td>{{ `${u.first_name} ${u.last_name}` }}</td>
          <td>
            <div class="flex gap-2">
              <router-link :to="{ name: Routes.USER_UPDATE.name, params: { id: u.id } }"
                ><Icon icon="bxs:edit" class="hover:cursor-pointer text-base text-slate-400"
              /></router-link>

              <Icon
                @click="mutateDelete(`${u.id}`)"
                icon="mdi:delete"
                class="hover:cursor-pointer text-base text-slate-400"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex mt-5 w-fit text-emerald-600">
    <nav>
      <ul class="inline-flex -space-x-px text-sm flex-wrap sm:flex-nowrap">
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight bg-white border border-e-0 border-gray-300 rounded-s hover:bg-gray-100"
            :class="[props.page <= max_page && ' text-slate-600']"
            >«</a
          >
        </li>
        <div v-for="i in max_page" :key="i">
          <li>
            <a
              href="#"
              :class="[
                i == props.page
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-white hover:bg-gray-100'
              ]"
              class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300"
              :onClick="() => updatePage(i)"
              >{{ i }}</a
            >
          </li>
        </div>
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300 rounded-e hover:bg-gray-100"
            :class="[props.page >= max_page && ' text-slate-600']"
            >»</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { QueryKeys } from '@/api/queries'
import type { UsersSchema } from '@/api/users'
import serviceUsers from '@/api/users'
import { Routes } from '@/router'
import { getDeviceType } from '@/utils'
import { Icon } from '@iconify/vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { type PropType } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps({
  users: Object as PropType<UsersSchema>,
  page: { type: Number, required: true },
  updatePage: { type: Function, required: true }
})
const device = getDeviceType()
const max_page = device === 'desktop' ? 11 : 7
const toast = useToast()
const queryClient = useQueryClient()

const { mutate: mutateDelete } = useMutation({
  mutationFn: serviceUsers.delete,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS] })
    toast.success('User deleted.')
  },
  onError: () => {
    toast.error('Cannot delete user.')
  }
})
</script>
