import orders from '../data/orders.json';

export default defineEventHandler(async (e) => {
  if (e.method !== 'GET') return;

  const authorizationToken = getCookie(e, 'authorization');

  if (authorizationToken) {
    const { username, password } = JSON.parse(authorizationToken);
    const userOrders = orders.find(({ credentials }) => {
      return username === credentials.username && password === credentials.passphrase;
    });

    if (userOrders) {
      // errors are returned to this user to demonstrate how error notifications work
      if (userOrders.credentials.passphrase === '23c2b519b1e2cd4bbaf5f68f58024785' && userOrders.credentials.username === 'nic.crew@creds.com') {
        throw createError({
          statusCode: 404,
          message: 'orders not found',
          statusMessage: 'orders not found'
        });
      }

      return { orders: userOrders.orders };
    } else {
      return { orders: [] };
    }
  }
  throw createError({
    statusCode: 401,
    message: '401 Unauthorized',
    statusMessage: '401 Unauthorized'
  });
});
