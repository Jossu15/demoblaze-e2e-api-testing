describe('Flujo de compra E2E en Demoblaze.com', () => {
  let productosData

  before(() => {
    cy.fixture('productos').then((data) => {
      productosData = data
    })
  })

  beforeEach(() => {
    cy.visit('/')
    cy.get('#tbodyid .card-title a').should('have.length.greaterThan', 1)
  })

  it('Debe completar el flujo de compra: agregar 2 productos, ver carrito, completar formulario y finalizar compra', () => {
    cy.log('=== PASO 1: Agregar dos productos al carrito ===')

    cy.agregarProductoAlCarrito(productosData.producto1.indice)

    cy.agregarProductoAlCarrito(productosData.producto2.indice)

    cy.log('=== PASO 2: Visualizar el carrito ===')

    cy.irAlCarrito()

    cy.verificarProductosEnCarrito(2)

    cy.get('#totalp').should('not.be.empty').and('not.equal', '0')

    cy.log('Total calculado correctamente en el carrito')

    cy.log('=== PASO 3: Completar el formulario de compra ===')

    cy.completarFormularioCompra(productosData.compra)

    cy.log('Formulario completado con datos de prueba')
    cy.log('Nota: demoblaze.com solo tiene campos basicos (Name, Country, City, Credit Card, Month, Year)')
    cy.log('Datos adicionales como apellidos, direccion, distrito, provincia, departamento, CVC estan registrados en fixtures')

    cy.log('=== PASO 4: Finalizar la compra ===')

    cy.finalizarCompra()

    cy.get('.sweet-alert h2, .sa-success, .sweet-alert .lead')
      .should('be.visible')
      .and('contain.text', 'Thank you for your purchase!')

    cy.log('Compra finalizada exitosamente')
  })
})
