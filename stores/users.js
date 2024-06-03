export const useUsersStore = defineStore("users", () => {
   let baseURL = useRuntimeConfig().public.apiBase;
   const users = ref([]);
   const user = ref({});

    async function getUsers() {
      return await $fetch(
         baseURL +`users?limit=0`,
        {
          method: "GET",
          headers: {
             Accept:"application/json",
             "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          users.value =   response.users 
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

    async function getSinglUser(id) {
      return await $fetch(
         baseURL +`users/${id}`,
        {
          method: "GET",
          headers: {
             Accept:"application/json",
             "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          user.value =   response 
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
      getUsers,
      users,
      getSinglUser,
      user
    };
});