# Використовуємо офіційний образ Node.js
FROM node:16

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності, включаючи модуль mongodb
RUN npm install mongodb && npm install

# Копіюємо решту файлів додатку
COPY . .

# Відкриваємо порт
EXPOSE 3000

# Запускаємо додаток
CMD ["node", "app.js"]
