import users from '../data/users.json';

export default defineEventHandler(async (e) => {
  if (e.method !== 'POST') return;

  const authorizationToken = getCookie(e, 'authorization');

  if (authorizationToken) {
    const { username, password } = JSON.parse(authorizationToken);
    const user = users.find(({ credentials }) => {
      return username === credentials.username && password === credentials.passphrase;
    });

    if (user) {
      return { authorization: true };
    }
  } else {
    return createError({
      statusCode: 401,
      message: '401 Unauthorized',
      statusMessage: '401 Unauthorized'
    });
  }
});
