============================================================
  PRUEBA E2E - FLUJO DE COMPRA EN DEMOBLAZE.COM
  Framework: Cypress.io
============================================================

REQUISITOS PREVIOS
------------------
- Node.js v18 o superior (https://nodejs.org/)
- npm v9 o superior (incluido con Node.js)
- Conexion a internet (para acceder a demoblaze.com)

INSTRUCCIONES DE INSTALACION
-----------------------------
1. Abrir una terminal o linea de comandos.
2. Navegar al directorio del proyecto:

   cd demoblaze-e2e

3. Instalar las dependencias:

   npm install

   Esto descargara Cypress y el navegador Electron integrado.
   La primera instalacion puede tardar 1-2 minutos.

EJECUCION DE LA PRUEBA
-----------------------

Opcion A - Modo Headless (recomendado para CI/CD):

   npm test

   - Ejecuta la prueba sin interfaz grafica.
   - Usa el navegador Electron integrado.
   - Genera un video de la ejecucion en: cypress/videos/
   - Genera screenshots automaticos en caso de fallo en: cypress/screenshots/

Opcion B - Modo Visual (recomendado para desarrollo):

   npm run test:open

   - Abre la interfaz grafica de Cypress (Test Runner).
   - Seleccionar "E2E Testing" y luego el navegador deseado.
   - Hacer clic en el spec "compra_flujo.cy.js" para ejecutar.
   - Permite ver la ejecucion en tiempo real.

Opcion C - Con navegador especifico:

   npx cypress run --browser chrome
   npx cypress run --browser firefox
   npx cypress run --browser edge

ESTRUCTURA DEL PROYECTO
------------------------
demoblaze-e2e/
  cypress/
    e2e/
      compra_flujo.cy.js       -> Test E2E principal (flujo de compra)
    fixtures/
      productos.json           -> Datos de prueba (productos y datos de compra)
    support/
      commands.js              -> Comandos personalizados de Cypress
      e2e.js                   -> Archivo de soporte global
    videos/                    -> Videos de ejecucion (generado automaticamente)
    screenshots/               -> Screenshots de fallos (generado automaticamente)
  cypress.config.js            -> Configuracion de Cypress
  package.json                 -> Dependencias del proyecto
  readme.txt                   -> Este archivo
  conclusiones.txt             -> Hallazgos y conclusiones

FLUJO DE PRUEBA AUTOMATIZADO
------------------------------
El test "compra_flujo.cy.js" ejecuta los siguientes pasos en https://www.demoblaze.com:

1. AGREGAR DOS PRODUCTOS AL CARRITO
   - Navega a la pagina principal de demoblaze.com
   - Cada producto tiene un enlace que lleva a su pagina de detalle
   - Selecciona el primer producto y lo agrega al carrito
   - Regresa al home, selecciona el segundo producto y lo agrega

2. VISUALIZAR EL CARRITO
   - Hace clic en el enlace "Cart" en el navbar (parte superior derecha)
   - Navega a la pagina del carrito
   - Verifica que ambos productos estan listados
   - Verifica que el total se calcula correctamente

3. COMPLETAR EL FORMULARIO DE COMPRA
   - Hace clic en "Place Order"
   - Llena los campos disponibles en demoblaze.com:
     * Name (nombres y apellidos completos)
     * Country (pais)
     * City (ciudad)
     * Credit Card (numero de tarjeta)
     * Month (mes de caducidad)
     * Year (anio de caducidad)
   - Datos adicionales registrados en fixtures para referencia:
     * Apellidos
     * Direccion de entrega
     * Distrito
     * Provincia
     * Departamento
     * CVC
     * Titular de la tarjeta

4. FINALIZAR LA COMPRA
   - Hace clic en "Purchase"
   - Verifica el mensaje de confirmacion "Thank you for your purchase!"

DATOS DE PRUEBA
----------------
Los datos de compra se encuentran en cypress/fixtures/productos.json:

Datos utilizados en el formulario:
  - Nombre completo: Juan Carlos Perez Rodriguez
  - Pais: Peru
  - Ciudad: Lima
  - Numero de Tarjeta: 1234567890123456
  - Mes: 12
  - Anio: 2026

Datos adicionales registrados (no utilizados por demoblaze.com):
  - Nombres: Juan Carlos
  - Apellidos: Perez Rodriguez
  - Direccion: Av. Principal 123
  - Distrito: Miraflores
  - Provincia: Lima
  - Departamento: Lima
  - CVC: 123
  - Titular: Juan Carlos Perez Rodriguez
  - Fecha de caducidad: 12/26

RESULTADOS ESPERADOS
---------------------
- 1 test passing
- Duracion aproximada: 14-15 segundos
- Video generado en: cypress/videos/compra_flujo.cy.js.mp4

SOLUCION DE PROBLEMAS
----------------------
- Si Cypress no se instala: eliminar node_modules y package-lock.json, luego ejecutar npm install nuevamente.
- Si la prueba falla por timeout: aumentar defaultCommandTimeout en cypress.config.js.
- Si demoblaze.com no responde: verificar conexion a internet e intentar nuevamente.
- Si aparece error de politica de Chrome: ignorar el warning, Cypress usa Electron por defecto.
