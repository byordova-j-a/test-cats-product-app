import users from '../data/users.json';

export default defineEventHandler(async (e) => {
  if (e.method !== 'GET') return;

  const authorizationToken = getCookie(e, 'authorization');

  if (authorizationToken) {
    const { username, password } = JSON.parse(authorizationToken);
    const user = users.find(({ credentials }) => {
      return username === credentials.username && password === credentials.passphrase;
    });

    if (user) {
      // errors are returned to this user to demonstrate how error notifications work
      if (user.credentials.passphrase === '23c2b519b1e2cd4bbaf5f68f58024785' && user.credentials.username === 'nic.crew@creds.com') {
        throw createError({
          statusCode: 404,
          message: 'user not found',
          statusMessage: 'user not found'
        });
      }
      const { name, surname } = user;

      return { name, surname };
    } else {
      return { name: '', surname: '' };
    }
  }
  throw createError({
    statusCode: 401,
    message: '401 Unauthorized',
    statusMessage: '401 Unauthorized'
  });
});
