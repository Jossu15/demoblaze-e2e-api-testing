describe('Pruebas de APIs REST - Demoblaze.com', () => {
  let usersData
  let randomUsername

  before(() => {
    cy.fixture('users').then((data) => {
      usersData = data
    })
  })

  beforeEach(() => {
    randomUsername = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`
  })

  context('API Signup - https://api.demoblaze.com/signup', () => {
    it('Caso 1: Crear un nuevo usuario exitosamente', () => {
      cy.log('=== CASO 1: CREAR NUEVO USUARIO ===')
      cy.log(`Username: ${randomUsername}`)
      cy.log(`Password: ${usersData.nuevoUsuario.password}`)

      cy.signup(randomUsername, usersData.nuevoUsuario.password).then((response) => {
        cy.log('Entrada:', JSON.stringify({
          username: randomUsername,
          password: usersData.nuevoUsuario.password
        }))
        cy.log('Salida:', JSON.stringify(response.body))
        cy.log('Status Code:', response.status)

        expect(response.status).to.eq(200)
        expect(response.body).to.eq('')
        
        cy.log('✅ Usuario creado exitosamente')
      })
    })

    it('Caso 2: Intentar crear un usuario ya existente', () => {
      cy.log('=== CASO 2: USUARIO YA EXISTENTE ===')
      
      const existingUser = `existing_${Date.now()}`
      
      cy.signup(existingUser, usersData.usuarioExistente.password).then(() => {
        cy.log(`Usuario creado: ${existingUser}`)
        
        cy.wait(1000)
        
        cy.signup(existingUser, usersData.usuarioExistente.password).then((response) => {
          cy.log('Entrada:', JSON.stringify({
            username: existingUser,
            password: usersData.usuarioExistente.password
          }))
          cy.log('Salida:', JSON.stringify(response.body))
          cy.log('Status Code:', response.status)

          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('errorMessage')
          expect(response.body.errorMessage).to.eq('This user already exist.')
          
          cy.log('✅ Error esperado: usuario ya existe')
        })
      })
    })
  })

  context('API Login - https://api.demoblaze.com/login', () => {
    it('Caso 3: Login con usuario y contraseña correctos', () => {
      cy.log('=== CASO 3: LOGIN CORRECTO ===')
      
      const loginUser = `login_${Date.now()}`
      
      cy.signup(loginUser, usersData.loginCorrecto.password).then(() => {
        cy.log(`Usuario creado: ${loginUser}`)
        
        cy.wait(1000)
        
        cy.login(loginUser, usersData.loginCorrecto.password).then((response) => {
          cy.log('Entrada:', JSON.stringify({
            username: loginUser,
            password: usersData.loginCorrecto.password
          }))
          cy.log('Salida:', JSON.stringify(response.body))
          cy.log('Status Code:', response.status)

          expect(response.status).to.eq(200)
          expect(response.body).to.be.a('string')
          expect(response.body).to.include('Auth_token:')
          
          cy.log('✅ Login exitoso - Token recibido')
        })
      })
    })

    it('Caso 4: Login con contraseña incorrecta', () => {
      cy.log('=== CASO 4: LOGIN INCORRECTO ===')
      
      const loginUser = `login_fail_${Date.now()}`
      
      cy.signup(loginUser, usersData.loginCorrecto.password).then(() => {
        cy.log(`Usuario creado: ${loginUser}`)
        
        cy.wait(1000)
        
        cy.login(loginUser, usersData.loginIncorrecto.password).then((response) => {
          cy.log('Entrada:', JSON.stringify({
            username: loginUser,
            password: usersData.loginIncorrecto.password
          }))
          cy.log('Salida:', JSON.stringify(response.body))
          cy.log('Status Code:', response.status)

          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('errorMessage')
          expect(response.body.errorMessage).to.eq('Wrong password.')
          
          cy.log('✅ Error esperado: contraseña incorrecta')
        })
      })
    })
  })
})
