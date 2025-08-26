#1. imagen base
FROM node:18-alpine

#2.carpeta de trabajo
WORKDIR /app

#3.Instalación de dependencias
COPY package*.json ./
RUN npm install

#4.copial el resto del código
COPY . .

#5.Exponer el puerto
EXPOSE 3000
#6. Comando para ejecutar la aplicación
CMD ["node", "index.js"]