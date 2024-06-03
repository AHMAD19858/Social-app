<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  ShareIcon,
  ClipboardIcon
} from "@heroicons/vue/24/outline";

import { usePostStore } from "~/stores/posts";
import { useUsersStore } from "~/stores/users";
import { useCommentStore } from "~/stores/comments";
import { useClipboard } from "@vueuse/core";

const { getPosts } = usePostStore();
const { getUsers } = useUsersStore();
const { getcommnts } = useCommentStore();
const { posts } = storeToRefs(usePostStore());
const { users } = storeToRefs(useUsersStore());
const { comments } = storeToRefs(useCommentStore());
const source = ref("");
const hotPost = ref({})
const { copy, copied } = useClipboard({ source });
getcommnts();
getUsers().then(() => {
  getPosts().then(() => {
    posts.value = posts.value.map((e) => {
      const postUser = users.value.find((user) => user.id === e.userId);
      const postComments = comments.value.filter(
        (comment) => comment.postId === e.id
      );
      return {
        ...e,
        isLiked: false,
        isExpanded: false,
        writeComment: false,
        postUser: postUser,
        visibleComments: 2,
        postComments: postComments,
        comment: "",
      };
    });
    // Find the post with the most views
    hotPost.value = posts.value.reduce((max, post) => {
      return post.views > max.views ? post : max;
    }, posts.value[0]);

  });
});

function addComment(post) {
  post.postComments.push({
    id: 1,
    body: post.comment,
    postId: post.id,
    likes: 3,
    user: {
      id: 105,
      username: "Tim",
      fullName: "Tim cook",
    },
  });

  post.comment = "";
}
function incrementComments(post) {
  post.visibleComments += 3;
}

function visibleComments(post) {
  return post.postComments.slice(-post.visibleComments);
}
const navigation = [
  { name: "Posts", href: "#", icon: FolderIcon, current: true },
  { name: "Friends", href: "#", icon: ServerIcon, current: false },
  { name: "Groups", href: "#", icon: SignalIcon, current: false },
  { name: "Marketplace", href: "#", icon: GlobeAltIcon, current: false },
  { name: "Watch", href: "#", icon: ChartBarSquareIcon, current: false },
  { name: "Memories", href: "#", icon: Cog6ToothIcon, current: false },
];

const sidebarOpen = ref(false);
const isOpen = ref(false);
const randomUrl = ref("");
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
  generateRandomUrl();
}
function generateRandomUrl() {
  const protocols = ["http", "https"];
  const domains = ["example.com", "mysite.org", "test.net", "random.io"];
  const paths = ["about", "contact", "products", "services"];
  const protocol = protocols[Math.floor(Math.random() * protocols.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const path = paths[Math.floor(Math.random() * paths.length)];
  const query = `?id=${Math.floor(Math.random() * 1000)}`;
  randomUrl.value = `${protocol}://${domain}/${path}${query}`;
}

function like(item) {
  if (item.isLiked) {
    item.reactions.likes--;
    item.isLiked = false;
  } else if (!item.isLiked) {
    item.reactions.likes++;
    item.isLiked = true;
  }
}

function showMore(item) {
  item.isExpanded = !item.isExpanded;
}

function toggleComment(item) {
  item.writeComment = !item.writeComment;
}
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 xl:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10"
              >
                <div class="flex h-16 shrink-0 items-center">
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a
                            :href="item.href"
                            :class="[
                              item.current
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                            ]"
                          >
                            <component
                              :is="item.icon"
                              class="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <!--      <li>
                       <div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                       <ul role="list" class="-mx-2 mt-2 space-y-1">
                         <li v-for="team in teams" :key="team.name">
                           <a :href="team.href" :class="[team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                             <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">{{ team.initial }}</span>
                             <span class="truncate">{{ team.name }}</span>
                           </a>
                         </li>
                       </ul>
                     </li> -->
                    <li class="-mx-6 mt-auto">
                      <a
                        href="#"
                        class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                      >
                        <img
                          class="h-8 w-8 rounded-full bg-gray-800"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <span aria-hidden="true">Tom Cook</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-60 xl:flex-col dark:bg-[#1e1e1e]"
    >
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5"
      >
        <div class="flex h-16 shrink-0 items-center gap-2">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h1 class=" dark:text-white font-medium text-lg">Social-Task</h1>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <a
                    :href="item.href"
                    :class="[
                      item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      class="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="xl:pl-60 dark:bg-[#1e1e1e]">
      <Navbar />

      <!-- center -->
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Share Post
                  </DialogTitle>
                  <span class="text-base font-medium"> {{ randomUrl }}</span>
                  <div class="mt-4 flex justify-end">
                    <button
                      type="button"
                      class="inline-flex gap-2 outline-none justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none"
                      @click="copy(randomUrl)"
                    >
                    <span v-if="!copied">Copy</span>
                    <span v-else>Copied!</span>
                    <ClipboardIcon v-if="!copied" class="w-5 h-5"/>
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
      <main class="lg:w-[60%]">
        <div
          v-for="post in posts"
          :key="post.id"
          class=" px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:mx-7 mx-4 mt-8 lg:mr-10 w-[90%] border rounded-lg dark:border-gray-700 dark:bg-[#1e1e1e] bg-white/50 lg:w-full"
        >
          <NuxtLink
            target="_blank"
            :to="{ name: 'user-id', params: { id: post.userId } }"
          >
            <div class="flex items-start gap-4">
              <img
                alt=""
                class="w-16 h-16 rounded-full border dark:bg-gray-500 dark:border-gray-700"
                :src="
                  post.postUser?.image ??
                  'https://source.unsplash.com/40x40/?portrait?4'
                "
              />
              <div>
                <p class="font-bold dark:text-white font-montse">
                  {{ post.postUser?.firstName }} {{ post.postUser?.lastName }}
                </p>
                <p class="dark:text-white  ">@{{ post.postUser?.username }}</p>
              </div>
            </div>
          </NuxtLink>

          <p class="text-sm font-medium my-1 pt-2 dark:text-white font-montse">{{ post.title }}</p>
          <p class="text-sm font-normal text-zinc-800 dark:text-white">
            {{ post.isExpanded ? post.body : post.body.substring(0, 50) }}
            <span
              class="text-blue-500 text-xs cursor-pointer "
              @click="showMore(post)"
              >{{ post.isExpanded ? "Show Less" : "......" }}</span
            >
          </p>
          <!-- reactions count and views -->
          <div class="flex items-center justify-between mt-4 dark:text-white">
            <div class="flex gap-1">
              <div class="bg-blue-500  rounded-full px-1">
                <HandThumbUpIcon class="text-white h-5 w-4 pt-1" />
              </div>
              <p>{{ post.reactions.likes }}</p>
            </div>
            <!-- views -->
            <div class="flex items-center gap-1">
              <EyeIcon class="h-5 w-4" />
              <p>{{ post.views }}</p>
            </div>
          </div>
          <!-- actions -->
          <section
            class="dark:border-gray-700 w-full flex items-center justify-around gap-8 border-t border-b my-4 py-1 dark:text-white"
          >
            <div
              @click="like(post)"
              class="flex items-center gap-2 cursor-pointer"
            >
              <HandThumbUpIcon
                class="h-4 w-4 mt-[2px]"
                :class="post.isLiked && 'text-blue-500'"
              />
              <p class="font-medium text-blue-500 " v-if="post.isLiked">Liked</p>
              <p class="font-medium text-[#1e1e1e] dark:text-white" v-if="!post.isLiked">
                Like
              </p>
            </div>

            <div
              class="flex items-center gap-2 cursor-pointer "
              @click="toggleComment(post)"
            >
              <ChatBubbleOvalLeftEllipsisIcon class="h-4 w-4 mt-[2px]" />
              <p class="font-medium text-[#1e1e1e] dark:text-white">comment</p>
            </div>

            <div
              @click="openModal"
              class="flex items-center gap-2 cursor-pointer"
            >
              <ShareIcon class="h-4 w-4 mt-[2px]" />
              <p class="font-medium text-[#1e1e1e] dark:text-white">share</p>
            </div>
          </section>

          <!-- comments -->
          <div
            class="animate-slideDown px-4 border flex justify-between items-center gap-2 w-full rounded-lg dark:border-gray-700"
            v-if="post.writeComment"
          >
            <img
              alt=""
              class="w-10 h-10 rounded-full border dark:bg-gray-500 dark:border-gray-700"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
            <textarea
              class="w-full outline-none pt-4 bg-transparent dark:text-white"
              placeholder="Write a comment.."
              v-model="post.comment"
            />
            <button
              @click="addComment(post)"
              :disabled="post.comment.length < 1"
              class="dark:text-white font-montse text-sm"
            >
              comment
            </button>
          </div>

          <section
            class="rounded-lg px-4 py-4 w-full dark:text-white"
            v-if="post.writeComment"
            v-for="comment in visibleComments(post)"
            :key="comment.id"
          >
            <div class="flex items-start gap-4">
              <img
                alt=""
                class="w-10 h-10 rounded-full border dark:bg-gray-500 dark:border-gray-700"
                src="https://source.unsplash.com/40x40/?portrait?4"
              />
              <div>
                <p class=" font-montse text-sm">{{ comment.user.fullName }}</p>
                <p class="mb-4 mt-1">{{ comment.body }}</p>
              </div>
            </div>
            <hr class="dark:border-gray-700"/>
          </section>
          <button @click="incrementComments(post)" v-if="post.writeComment" class="dark:text-white flex justify-end w-full">
            load more
          </button>
        </div>
      </main>

      <!-- Activity feed -->
      <Trending :users="users" :trendPost="hotPost"/>
    </div>
  </div>
</template>
