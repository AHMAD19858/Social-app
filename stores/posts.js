export const usePostStore = defineStore("posts", () => {
   let baseURL = useRuntimeConfig().public.apiBase;
   const posts = ref([]);
   const userPosts = ref([]);


   async function getPosts() {
      return await $fetch(
         baseURL +`posts`,
        {
          method: "GET",
          headers: {
             Accept:"application/json",
             "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
         posts.value =   response.posts 
          return response;
        })
        .catch((err) => {
         
          throw {
            status: err.ok,
            code: err.status,
            message: err.message,
          };
        });
    }

    async function getuserPosts(id) {
      return await $fetch(
         baseURL +`posts/user/${id}`,
        {
          method: "GET",
          headers: {
             Accept:"application/json",
             "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          userPosts.value =   response.posts 
          return response;
        })
        .catch((err) => {
         
          throw {
            status: err.ok,
            code: err.status,
            message: err.message,
          };
        });
    }


    return {
      getPosts,
      posts,
      userPosts,
      getuserPosts
    };
});