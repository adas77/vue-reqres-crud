<template>
  <div>
    <div class="flex gap-6 flex-col lg:flex-row">
      <div class="bg-white rounded-lg shadow-md lg:w-2/3">
        <div class="mt-8 lg:mt-14 mx-3 lg:mx-7">
          <form
            @submit.prevent="onSubmit"
            class="flex flex-col gap-12 lg:gap-32 mb-5 text-slate-800"
          >
            <div class="flex gap-2 lg:gap-7">
              <div class="w-1/2 flex flex-col gap-2">
                <p>First Name</p>
                <input
                  name="first_name"
                  type="text"
                  class="px-4 py-2 rounded-md focus:outline-none bg-inherit border border-gray-300 w-full font-light"
                  :placeholder="user.first_name"
                  v-model="first_name"
                />
                <p class="text-red-500">
                  {{ errors.first_name || '&nbsp;' }}
                </p>
              </div>
              <div class="w-1/2 flex flex-col gap-2">
                <p>Last Name</p>
                <input
                  name="last_name"
                  type="text"
                  class="px-4 py-2 rounded-md focus:outline-none bg-inherit border border-gray-300 w-full font-light"
                  :placeholder="user.last_name"
                  v-model="last_name"
                />
                <p class="text-red-500">
                  {{ errors.last_name || '&nbsp;' }}
                </p>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                :disabled="!isFormValid || !isFieldTouched"
                type="submit"
                class="bg-emerald-600 disabled:bg-emerald-300 text-white font-semibold py-3 px-5 rounded-md shadow-md text-xs whitespace-nowrap"
              >
                {{
                  props.type === 'create'
                    ? 'Add User'
                    : props.type === 'update'
                      ? 'Update User'
                      : ''
                }}
              </button>
              <button
                v-if="props.type === 'update'"
                type="button"
                @click="handleDeleteUser"
                class="bg-red-500 text-white font-semibold py-3 px-5 rounded-md shadow-md text-xs whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        class="flex flex-col bg-white rounded-lg shadow-md lg:w-1/3 items-center justify-end lg:gap-14"
      >
        <div class="flex justify-center items-center py-8">
          <div class="flex items-center avatar">
            <div class="w-32 rounded-full">
              <img :src="avatar ? avatar : user.avatar" :alt="user.avatar" />
            </div>
          </div>
        </div>
        <div class="w-full flex items-center justify-center mb-5">
          <label
            for="upload"
            class="w-full cursor-pointer flex items-center justify-center border-2 border-slate-400 text-slate-500 rounded-md mx-4 py-2"
          >
            <Icon icon="mdi:camera" class="text-base" />
            <span class="ml-2">Change photo</span>
            <input
              name="upload"
              id="upload"
              type="file"
              class="hidden"
              @change="handleFileChange"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserCreateSchema } from '@/api/users'
import serviceUsers, { userCreateSchema } from '@/api/users'
import personImg from '@/assets/person.png'
import router, { Routes } from '@/router'
import { Icon } from '@iconify/vue'
import { useMutation } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm, useIsFormValid } from 'vee-validate'
import { type PropType } from 'vue'
import { useToast } from 'vue-toastification'
type FormType = 'update' | 'create'
const props = defineProps({
  user: {
    type: Object as PropType<UserCreateSchema>,
    default: () =>
      ({
        first_name: '',
        last_name: '',
        avatar: personImg
      }) as UserCreateSchema
  },
  type: { type: String as PropType<FormType>, required: true }
})
const user = props.user

const toast = useToast()
const { handleSubmit, errors, isFieldTouched } = useForm({
  validationSchema: toTypedSchema(userCreateSchema)
})
const isFormValid = useIsFormValid()

const { value: first_name } = useField<string>('first_name')
const { value: last_name } = useField<string>('last_name')
const { value: avatar } = useField<string>('upload')

first_name.value = user.first_name
last_name.value = user.last_name

const { mutate: mutateUpdate } = useMutation({
  mutationFn: serviceUsers.update,
  onSuccess: () => {
    router.push({ name: Routes.HOME.name })
    toast.success('User data updated.')
  },
  onError: () => {
    toast.error('Cannot update user.')
  }
})

const { mutate: mutateCreate } = useMutation({
  mutationFn: serviceUsers.create,
  onSuccess: () => {
    router.push({ name: Routes.HOME.name })
    toast.success('User data created.')
  },
  onError: () => {
    toast.error('Cannot create user.')
  }
})

const { mutate: mutateDelete } = useMutation({
  mutationFn: serviceUsers.delete,
  onSuccess: () => {
    router.push({ name: Routes.HOME.name })
    toast.success('User deleted.')
  },
  onError: () => {
    toast.error('Cannot delete user.')
  }
})

const handleDeleteUser = () => {
  if (props.type === 'update' && user.id) {
    mutateDelete(`${user.id}`)
  }
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const selectedFile = input.files[0]
    const fileURL = URL.createObjectURL(selectedFile)
    avatar.value = fileURL
  }
}

const onSubmit = handleSubmit((values) => {
  const data = { ...values, id: user.id, avatar: avatar.value }
  if (props.type === 'create') {
    mutateCreate(data)
  } else if (props.type === 'update') {
    mutateUpdate(data)
  }
})
</script>
