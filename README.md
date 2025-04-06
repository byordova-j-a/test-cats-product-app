## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# yarn
yarn dev
```

## Users

У пользователя nic.crew@creds.com при запросах на получение информации возвращаются ошибки - для демонстрации работы уведломлений об ошибках.

## Опишите процесс развёртывания приложения на PROD сервере

1. Создание docker-compose.yml файла для запуска приложения в контейнерах.
2. Создать DigitalOcean droplet.
3. Настроить подключение по ssh к droplet.
4. Загрузить код с github
5. Запустить контейнер.
