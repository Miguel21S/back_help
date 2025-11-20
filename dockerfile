# USAR IMAGEN A BASE DE NODE
FROM node:20

# CREAR DIRECTORIO EN EL CONTENEDOR
WORKDIR /app

# Instalamos dependencias necesarias del sistema (importante para pdfmake)
RUN apt-get update && apt-get install -y build-essential python3 && rm -rf /var/lib/apt/lists/*

# COPIAR PACKAGE.JSON Y PACKAGE-LOCK.JSON
COPY package*.json ./

# INSTALAR DEPENDENCIAS
#RUN npm install -g ts-node typescript

# DESPUÉS
RUN npm install --legacy-peer-deps

# COPIAR EL RESTO DEL CÓDIGO
COPY . .

# COPIAR LA CARPETA DE FUENTES (IMPORTANTE)
#COPY src/reports/fonts ./src/reports/fonts
COPY get-fonts.sh /get-fonts.sh

# COPIAR SCRIPTS
COPY wait-for-db.sh /wait-for-db.sh

# DAR PERMISOS
RUN chmod +x /wait-for-db.sh

# PUERTA DE MI APP
EXPOSE 2025

# COMANDO DE EJECUCIÓN — usa el script para esperar a la DB
CMD ["/wait-for-db.sh", "npm", "run", "dev"]
