<script setup>
import {
  UserGroupIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
} from "@heroicons/vue/24/outline";
const props = defineProps({
  users: Array || null,
  trendPost: Object || null,
});
</script>
<template>
  <aside
    class="lg:fixed lg:bottom-0 lg:right-0 lg:top-14 lg:w-96 lg:overflow-y-auto lg:border-l dark:bg-[#1e1e1e] dark:border-gray-700"
  >
    <section class="border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div class="flex items-center gap-2">
        <h2
          class="text-base font-semibold leading-7 text-black dark:text-white"
        >
          Trending
        </h2>
        <ArrowTrendingUpIcon class="h-4 w-4 mt-[2px] dark:text-white" />
      </div>

      <div class="border rounded-lg dark:border-gray-700 px-2 py-2 mt-4">
        <div class="relative">
          <p
            class="text-xs flex opacity-70 items-center gap-2 right-1 bg-[#1e1e1e] rounded-full absolute top-1 px-2 py-[2px] z-10 text-white"
          >
            <EyeIcon class="h-4 w-4 dark:text-white" />
            {{ trendPost.views }}
          </p>
          <img
            class="w-full rounded-lg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg"
            alt="Trend post"
          />
        </div>
        <p class=" text-sm dark:text-white font-montse pt-3">
          {{ trendPost.title?.substring(0, 24) + "...." }}
        </p>
        <p class="dark:text-white pb-2 text-sm">
          {{ trendPost.body?.substring(0, 50) + "...." }}
        </p>
      </div>
    </section>
    <hr class="dark:border-gray-700"/>
    <!-- friends -->
    <section
      class="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
    >
      <div class="flex items-center gap-2">
        <h2
          class="text-base font-semibold leading-7 text-black dark:text-white"
        >
          Friends
        </h2>
        <UserGroupIcon class="h-4 w-4 mt-[2px] dark:text-white" />
      </div>
      <a href="#" class="text-sm font-semibold leading-6 text-indigo-400"
        >View all</a
      >
    </section>
    <ul role="list" class="animate-fade">
      <li class="px-4 sm:px-6 lg:px-8">
        <NuxtLink target="_blank" :to="`/user/${users[0]?.id}`">
          <div class="flex items-center gap-x-3">
            <img
              :src="users[0]?.image"
              alt=""
              class="h-7 w-7 flex-none rounded-full bg-gray-800"
            />
            <h3
              class="flex-auto truncate text-sm font-semibold leading-6 text-black dark:text-white"
            >
              {{ users[0]?.firstName }} {{ users[0]?.lastName }}
            </h3>
            <p class="bg-green-500 text-white text-sm px-2 rounded">Online</p>
          </div>
        </NuxtLink>
      </li>

  <!--     <li class="px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink target="_blank" :to="`/user/${users[1]?.id}`">
          <div class="flex items-center gap-x-3">
            <img
              :src="users[1]?.image"
              alt=""
              class="h-7 w-7 flex-none rounded-full bg-gray-800"
            />
            <h3
              class="flex-auto truncate text-sm font-semibold leading-6 text-black dark:text-white"
            >
              {{ users[1]?.firstName }} {{ users[1]?.lastName }}
            </h3>
            <p class="bg-green-500 text-white text-sm px-2 rounded">Online</p>
          </div>
        </NuxtLink>
      </li> -->

<!--       <li class="px-4 sm:px-6 lg:px-8">
        <NuxtLink target="_blank" :to="`/user/${users[2]?.id}`">
          <div class="flex items-center gap-x-3">
            <img
              :src="users[2]?.image"
              alt=""
              class="h-7 w-7 flex-none rounded-full bg-gray-800"
            />
            <h3
              class="flex-auto truncate text-sm font-semibold leading-6 text-black dark:text-white"
            >
              {{ users[2]?.firstName }} {{ users[2]?.lastName }}
            </h3>
            <p class="bg-gray-400 text-white text-sm px-2 rounded">Offline</p>
          </div>
        </NuxtLink>
      </li> -->
      <li class="px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink target="_blank" :to="`/user/${users[4]?.id}`">
          <div class="flex items-center gap-x-3">
            <img
              :src="users[4]?.image"
              alt=""
              class="h-7 w-7 flex-none rounded-full bg-gray-800"
            />
            <h3
              class="flex-auto truncate text-sm font-semibold leading-6 text-black dark:text-white"
            >
              {{ users[4]?.firstName }} {{ users[4]?.lastName }}
            </h3>
            <p class="bg-gray-400 text-white text-sm px-2 rounded">Offline</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>
