Cypress.Commands.add('agregarProductoAlCarrito', (indiceProducto) => {
  cy.get('#tbodyid .card-title a')
    .should('have.length.greaterThan', indiceProducto)
    .eq(indiceProducto)
    .then(($el) => {
      const nombreProducto = $el.text().trim()
      cy.log('Producto a agregar: ' + nombreProducto)
      
      cy.wrap($el).click()
      cy.url().should('include', 'prod.html')
      
      cy.once('window:alert', (text) => {
        expect(text).to.equal('Product added')
      })
      
      cy.get('a[onclick*="addToCart"]').should('be.visible').click()
      cy.wait(500)
      cy.visit('/')
      cy.get('#tbodyid .card-title a').should('have.length.greaterThan', 1)
    })
})

Cypress.Commands.add('irAlCarrito', () => {
  cy.get('#cartur').click()
  cy.url().should('include', 'cart.html')
})

Cypress.Commands.add('verificarProductosEnCarrito', (cantidadEsperada) => {
  cy.get('#tbodyid tr').should('have.length', cantidadEsperada)
})

Cypress.Commands.add('completarFormularioCompra', (datosCompra) => {
  cy.get('button[data-toggle="modal"][data-target="#orderModal"]').click()
  cy.get('#orderModal').should('be.visible')
  
  cy.log('Llenando campo Name (nombres y apellidos)')
  cy.get('#name').type(datosCompra.nombreCompleto)
  
  cy.log('Llenando campo Country (pais)')
  cy.get('#country').type(datosCompra.pais)
  
  cy.log('Llenando campo City (ciudad)')
  cy.get('#city').type(datosCompra.ciudad)
  
  cy.log('Llenando campo Credit Card (numero de tarjeta)')
  cy.get('#card').type(datosCompra.numeroTarjeta)
  
  cy.log('Llenando campo Month (mes de caducidad)')
  cy.get('#month').type(datosCompra.mes)
  
  cy.log('Llenando campo Year (anio de caducidad)')
  cy.get('#year').type(datosCompra.anio)
  
  cy.log('Datos adicionales registrados en fixtures:')
  cy.log('- Apellidos: ' + datosCompra.apellidos)
  cy.log('- Direccion: ' + datosCompra.direccion)
  cy.log('- Distrito: ' + datosCompra.distrito)
  cy.log('- Provincia: ' + datosCompra.provincia)
  cy.log('- Departamento: ' + datosCompra.departamento)
  cy.log('- CVC: ' + datosCompra.cvc)
  cy.log('- Titular: ' + datosCompra.titularTarjeta)
})

Cypress.Commands.add('finalizarCompra', () => {
  cy.get('button[onclick="purchaseOrder()"]').click()
})
