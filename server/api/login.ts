import users from '../data/users.json';

export default defineEventHandler(async (e) => {
  if (e.method !== 'POST') return;
  const { username, password } = await readBody(e);

  const user = users.find(({ credentials }) => {
    return username === credentials.username && password === credentials.passphrase;
  });

  if (user) {
    setCookie(e, 'authorization', JSON.stringify({ username, password }));

    return { authorization: true };
  }
  throw createError({
    statusCode: 401,
    message: '401 Unauthorized',
    statusMessage: '401 Unauthorized'
  });
});
