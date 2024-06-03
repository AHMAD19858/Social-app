<script setup>
import { BellIcon,MoonIcon,SunIcon } from "@heroicons/vue/24/outline";
import { Bars3Icon } from "@heroicons/vue/20/solid";
import { useColorMode } from '@vueuse/core'
const colorMode = useColorMode();

</script>
<template>
  <div
    class="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-x-6 border-b border-white/5  lg:backdrop-blur-sm px-4 shadow-sm sm:px-6 lg:px-8"
  >
    <button
      type="button"
      class="-m-2.5 p-2.5 text-white xl:hidden"
      @click="sidebarOpen = true"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-5 w-5" aria-hidden="true" />
    </button>
    <div class="flex w-full justify-end items-center gap-4">
      <MoonIcon class="dark:text-white h-6 w-6 text-black cursor-pointer"   @click="colorMode = 'light'"   v-show="colorMode === 'dark'"/>
      <SunIcon class="dark:text-white h-6 w-6 text-black cursor-pointer"   @click="colorMode = 'dark'"  v-show="colorMode === 'light'"/>

      <div class="relative">
        <div
          class="w-2 h-2 right-1 bg-red-500 rounded-full absolute animate-pulse"
        ></div>
        <BellIcon class="dark:text-white h-6 w-6 text-black" />
        
      </div>
      <div class="flex items-center gap-2">
        <img
          class="h-8 w-8 rounded-full bg-gray-800"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />

        <span class="dark:text-white font-medium text-sm">Tom Cook</span>
      </div>
    </div>
  </div>
</template>
