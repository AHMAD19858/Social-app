export const useCommentStore = defineStore("comments", () => {
   let baseURL = useRuntimeConfig().public.apiBase;
   const comments = ref([]);
    async function getcommnts() {
      return await $fetch(
         baseURL +`comments?limit=0`,
        {
          method: "GET",
          headers: {
             Accept:"application/json",
             "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          comments.value =   response.comments 
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
      comments,
      getcommnts
    };
});