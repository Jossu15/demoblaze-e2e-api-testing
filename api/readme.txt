============================================================
  PRUEBAS DE APIs REST - DEMOBLAZE.COM
  Framework: Cypress.io
============================================================

REQUISITOS PREVIOS
------------------
- Node.js v18 o superior (https://nodejs.org/)
- npm v9 o superior (incluido con Node.js)
- Conexion a internet (para acceder a las APIs de demoblaze.com)

INSTRUCCIONES DE INSTALACION
-----------------------------
1. Abrir una terminal o linea de comandos.
2. Navegar al directorio del proyecto:

   cd demoblaze-api-tests

3. Instalar las dependencias:

   npm install

   Esto descargara Cypress y el navegador Electron integrado.
   La primera instalacion puede tardar 1-2 minutos.

EJECUCION DE LAS PRUEBAS
-------------------------

Opcion A - Modo Headless (recomendado para CI/CD):

   npm test

   - Ejecuta las pruebas sin interfaz grafica.
   - Usa el navegador Electron integrado.
   - Genera un video de la ejecucion en: cypress/videos/
   - Genera screenshots automaticos en caso de fallo en: cypress/screenshots/

Opcion B - Modo Visual (recomendado para desarrollo):

   npm run test:open

   - Abre la interfaz grafica de Cypress (Test Runner).
   - Seleccionar "E2E Testing" y luego el navegador deseado.
   - Hacer clic en el spec "api_tests.cy.js" para ejecutar.
   - Permite ver la ejecucion en tiempo real.

Opcion C - Con navegador especifico:

   npx cypress run --browser chrome
   npx cypress run --browser firefox
   npx cypress run --browser edge

ESTRUCTURA DEL PROYECTO
------------------------
demoblaze-api-tests/
  cypress/
    e2e/
      api_tests.cy.js            -> Tests de APIs (signup y login)
    fixtures/
      users.json                 -> Datos de prueba (usuarios y contraseñas)
    support/
      commands.js                -> Comandos personalizados (signup, login)
      e2e.js                     -> Archivo de soporte global
    videos/                      -> Videos de ejecucion (generado automaticamente)
    screenshots/                 -> Screenshots de fallos (generado automaticamente)
  cypress.config.js              -> Configuracion de Cypress
  package.json                   -> Dependencias del proyecto
  readme.txt                     -> Este archivo
  conclusiones.txt               -> Hallazgos y conclusiones

APIS PROBADO
-------------

1. API SIGNUP - https://api.demoblaze.com/signup
   Metodo: POST
   Content-Type: application/json
   
   Body de entrada:
   {
     "username": "string",
     "password": "string"
   }
   
   Respuestas posibles:
   - Exito: "" (string vacio)
   - Error: {"errorMessage": "This user already exist."}

2. API LOGIN - https://api.demoblaze.com/login
   Metodo: POST
   Content-Type: application/json
   
   Body de entrada:
   {
     "username": "string",
     "password": "string"
   }
   
   Respuestas posibles:
   - Exito: "Auth_token: [token_base64]"
   - Error: {"errorMessage": "Wrong password."}

CASOS DE PRUEBA IMPLEMENTADOS
-------------------------------

CASO 1: Crear un nuevo usuario en signup
   - Endpoint: POST https://api.demoblaze.com/signup
   - Entrada: username unico generado aleatoriamente, password valido
   - Salida esperada: "" (string vacio)
   - Validacion: response.status == 200 y response.body == ""

CASO 2: Intentar crear un usuario ya existente
   - Endpoint: POST https://api.demoblaze.com/signup
   - Entrada: username ya registrado, password valido
   - Salida esperada: {"errorMessage": "This user already exist."}
   - Validacion: response.body.errorMessage == "This user already exist."

CASO 3: Usuario y contraseña correctos en login
   - Endpoint: POST https://api.demoblaze.com/login
   - Entrada: username registrado, password correcto
   - Salida esperada: "Auth_token: [token_base64]"
   - Validacion: response.body incluye "Auth_token:"

CASO 4: Usuario y contraseña incorrectos en login
   - Endpoint: POST https://api.demoblaze.com/login
   - Entrada: username registrado, password incorrecto
   - Salida esperada: {"errorMessage": "Wrong password."}
   - Validacion: response.body.errorMessage == "Wrong password."

DATOS DE PRUEBA
----------------
Los datos de prueba se encuentran en cypress/fixtures/users.json:
  - nuevoUsuario: username y password para crear usuario nuevo
  - usuarioExistente: username y password de usuario existente
  - loginCorrecto: username y password correctos para login
  - loginIncorrecto: username correcto y password incorrecto

Nota: Los usernames se generan dinamicamente con timestamp y numero
aleatorio para evitar conflictos entre ejecuciones de pruebas.

RESULTADOS ESPERADOS
---------------------
- 4 tests passing
- Duracion aproximada: 8-12 segundos
- Video generado en: cypress/videos/api_tests.cy.js.mp4

SOLUCION DE PROBLEMAS
----------------------
- Si Cypress no se instala: eliminar node_modules y package-lock.json, luego ejecutar npm install nuevamente.
- Si la prueba falla por timeout: aumentar defaultCommandTimeout en cypress.config.js.
- Si las APIs no responden: verificar conexion a internet e intentar nuevamente.
- Si aparece error de politica de Chrome: ignorar el warning, Cypress usa Electron por defecto.
