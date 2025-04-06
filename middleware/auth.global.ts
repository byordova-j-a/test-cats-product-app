export default defineNuxtRouteMiddleware(async (to) => {
  const { error } = await useFetch('/api/auth', {
    method: 'POST'
  });

  if (error.value) {
    if (to.path === '/') {
      return navigateTo('/login', { external: true });
    }

    return;
  }
  if (to.path === '/login') {
    return navigateTo('/', { external: true });
  }
});
