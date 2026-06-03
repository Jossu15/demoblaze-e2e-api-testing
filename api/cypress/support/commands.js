Cypress.Commands.add('signup', (username, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://api.demoblaze.com/signup',
    body: {
      username: username,
      password: password
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('login', (username, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://api.demoblaze.com/login',
    body: {
      username: username,
      password: password
    },
    failOnStatusCode: false
  })
})
