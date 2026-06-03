# Pruebas Automatizadas - Demoblaze.com

Este repositorio contiene dos proyectos de pruebas automatizadas para el sitio web [demoblaze.com](https://www.demoblaze.com/):

1. **Pruebas E2E (End-to-End)** - Automatización del flujo de compra completo
2. **Pruebas de APIs REST** - Validación de los servicios de signup y login

## 📁 Estructura del Proyecto

```
demoblaze-combined/
├── e2e/                    # Pruebas E2E con Cypress
│   ├── cypress/
│   ├── cypress.config.js
│   ├── package.json
│   ├── readme.txt
│   └── conclusiones.txt
├── api/                    # Pruebas de APIs REST con Cypress
│   ├── cypress/
│   ├── cypress.config.js
│   ├── package.json
│   ├── readme.txt
│   └── conclusiones.txt
└── README.md              # Este archivo
```

## 🚀 Proyecto 1: Pruebas E2E

### Descripción
Automatización del flujo completo de compra en demoblaze.com:
- Agregar 2 productos al carrito
- Visualizar el carrito
- Completar formulario de compra
- Finalizar la compra

### Framework
- **Cypress.io** v13.17.0
- Navegador: Electron 118 (headless)

### Ejecución

```bash
cd e2e
npm install
npm test              # Modo headless
npm run test:open     # Modo visual
```

### Resultados
- ✅ 1 test passing
- ⏱️ Duración: ~14 segundos
- 🎥 Video generado automáticamente

### Documentación
Ver `e2e/readme.txt` y `e2e/conclusiones.txt` para más detalles.

---

## 🔌 Proyecto 2: Pruebas de APIs REST

### Descripción
Validación de los servicios REST de demoblaze.com:
- API Signup: Crear nuevo usuario
- API Signup: Intentar crear usuario duplicado
- API Login: Login con credenciales correctas
- API Login: Login con contraseña incorrecta

### Framework
- **Cypress.io** v13.17.0
- Método: `cy.request()` para peticiones HTTP

### APIs Probadas

**1. Signup API**
- Endpoint: `POST https://api.demoblaze.com/signup`
- Body: `{"username": "string", "password": "string"}`

**2. Login API**
- Endpoint: `POST https://api.demoblaze.com/login`
- Body: `{"username": "string", "password": "string"}`

### Ejecución

```bash
cd api
npm install
npm test              # Modo headless
npm run test:open     # Modo visual
```

### Resultados
- ✅ 4 tests passing
- ⏱️ Duración: ~6 segundos
- 🎥 Video generado automáticamente

### Documentación
Ver `api/readme.txt` y `api/conclusiones.txt` para más detalles.

---

## 📋 Requisitos Generales

- **Node.js** v18 o superior
- **npm** v9 o superior
- Conexión a internet (para acceder a demoblaze.com)

## 🛠️ Instalación Rápida

Para ejecutar ambos proyectos:

```bash
# Instalar dependencias del proyecto E2E
cd e2e
npm install

# Instalar dependencias del proyecto API
cd ../api
npm install
```

## 📊 Resumen de Pruebas

| Proyecto | Tests | Duración | Estado |
|----------|-------|----------|--------|
| E2E | 1 | ~14s | ✅ Passing |
| API | 4 | ~6s | ✅ Passing |
| **Total** | **5** | **~20s** | **✅ All Passing** |

## 🎯 Casos de Prueba

### E2E - Flujo de Compra
1. ✅ Agregar 2 productos al carrito
2. ✅ Visualizar carrito con productos
3. ✅ Completar formulario de compra
4. ✅ Finalizar compra exitosamente

### API - Servicios REST
1. ✅ Crear nuevo usuario (signup)
2. ✅ Validar usuario duplicado (signup)
3. ✅ Login con credenciales correctas
4. ✅ Login con contraseña incorrecta

## 📹 Videos de Ejecución

Ambos proyectos generan videos automáticamente:
- E2E: `e2e/cypress/videos/compra_flujo.cy.js.mp4`
- API: `api/cypress/videos/api_tests.cy.js.mp4`

## 🔗 Enlaces

- **Sitio web:** https://www.demoblaze.com/
- **APIs:** https://api.demoblaze.com/
- **Cypress:** https://www.cypress.io/

## 📝 Notas

- Las pruebas E2E usan `cy.visit()` para navegar por el sitio
- Las pruebas API usan `cy.request()` para peticiones HTTP directas
- Ambos proyectos son independientes y pueden ejecutarse por separado
- Los usernames en las pruebas API se generan dinámicamente para evitar conflictos

## 👤 Autor

Proyecto desarrollado como ejercicio de automatización de pruebas.

## 📄 Licencia

Este proyecto es de uso educativo.
