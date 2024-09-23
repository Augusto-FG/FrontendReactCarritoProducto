# 🛒 Frontend de Carrito de Compras en React

¡Bienvenido al proyecto frontend del sistema de gestión de carritos! 🚀 Este proyecto está construido con **React** y **Vite**, utilizando **Material UI** para un diseño moderno y responsivo. A continuación, te  muestro cómo desplegarlo localmente.

## 🚀 Despliegue Local

Sigue estos pasos para ejecutar la aplicación en tu entorno local:

### 1. **Instalar Node.js**
   - Descarga e instala [Node.js](https://nodejs.org) (incluye npm).

### 2. **Eliminar la Carpeta `node_modules`**
   - Si descargaste el proyecto y esta carpeta existe, elimínala para asegurar una instalación limpia. Luego instalaremos las dependencias.

### 3. **Abrir el Proyecto en Visual Studio Code**
   - Utiliza Visual Studio Code o tu editor favorito para abrir el proyecto.

### 4. **Instalar Dependencias**
   - Abre la terminal en la carpeta del proyecto y ejecuta:
     ```bash
     npm install
     ```
     Esto instalará todas las dependencias necesarias que están definidas en `package.json`.

### 5. **Iniciar el Servidor de Desarrollo**
   - Una vez instaladas las dependencias, inicia la aplicación con:
     ```bash
     npm run dev
     ```

### 6. **Abrir la Aplicación en el Navegador**
   - Navega a [http://localhost:5173](http://localhost:5173) o la URL que indique la terminal para ver la aplicación en funcionamiento.

---

## 📁 Estructura del Proyecto

El proyecto está organizado en varias carpetas principales para facilitar la modularización del código:

### 1. **`/src/components`**
   - Aquí se encuentran los componentes reutilizables, como botones, cards, etc. Por ejemplo, `ButtonHome.jsx`.

### 2. **`/src/pages`**
   - Contiene las vistas principales de la aplicación, como `Home.jsx`, `CarritoDetail.jsx`, y más.

### 3. **`/src/services`**
   - En esta carpeta se gestionan las integraciones con el backend utilizando `axios`. Aquí se encuentran servicios como `CarritoService.js` y `ProductService.js`.

---

## 🛠️ Tecnologías Utilizadas

- **React**: Biblioteca principal para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para aplicaciones de frontend.
- **Material UI**: Framework de componentes de interfaz de usuario.
- **Axios**: Cliente HTTP para hacer solicitudes al backend.

---

## 🎉 ¡Gracias por tu interés en el proyecto! 

Si tenes alguna duda o sugerencia, no dudes en contribuir o abrir un issue en el repositorio. 😄
