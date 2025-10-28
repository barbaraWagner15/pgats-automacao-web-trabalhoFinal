/// <reference types="cypress" />
/** 
// describe / context - suíte ou conjuntyo de testes em um mesmo arquivo
//it - um teste de um bloco ou conjunto de testes


//describe -> Automation Exercice2
//  it -> Cadastrar um usuário
//  it - > Teste abcd
**/

/*
HOOKS / GANCHOS
    BEFORE-> ANTES DE TODOS OS TESTES
    BEFORE EACH -> ANTES DE CADA TESTE
    AFTER -> DEPOIS DE TODOS OS TESTES
    AFTER EACH -> DEPOIS DE CADA TESTE  
*/

import userData from '../fixtures/example.json'

import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers.js'

import { faker } from '@faker-js/faker'



describe('Automation Exercise', () => {
    //BEFOREEACH VAI RODAR ANTES DE CADA TODOS OS TESTES
    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://www.automationexercise.com/')
        cy.get('a[href="/login"]').click()
});

    it('Exemplos de Logs', () => {
        cy.log(`STEP 1 :: PGATS AUTOMACAO WEB CY LOGH`)
        cy.log(`STEP 2 :: PGATS AUTOMACAO WEB CY LOGH`)

        cy.log(`getRandomNumber(): ${getRandomNumber()}`)
        cy.log(`getRandomEmail(): ${getRandomEmail()}`)

        cy.log(`Dog Breed: ${faker.animal.dog()}`)
        cy.log(`Cat Breed: ${faker.animal.cat()}`)
        cy.log(`FullName: ${faker.person.fullName()}`)
        cy.log(`FullName: ${faker.company.name()}`)

        cy.log(`Nome de usuário: ${userData.name}`)
        cy.log(`Email de usuário: ${userData.email}`)
        

       // throw new Error("");
        console.log('PGATS AUTOMACAO WEB CONSOLE LOG')  
    })
//Test Case 1: Register User

    it.only('Cadastrar um usuario', () => {
        const timestamp = new Date().getTime()    
      
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"').type(`qa-tester-${timestamp}@test.com`)
        cy.contains('button', 'Signup').click()


        //cy.get('input[type=radio]').check('Mrs')
        cy.get('#id_gender1').check()

        cy.get('input#password').type('12345', { log: false})

        //para comboboxes ou selects-> select
        cy.get('select[data-qa=days]').select('20')
        cy.get('select[data-qa=months]').select('September')
        cy.get('select[data-qa=years]').select('1992')

        //radio ou checkboxes -> check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        //cy.get('input#first_name').type('Bob')
        cy.get('input#last_name').type(faker.person.lastName())
        //cy.get('input#last_name').type('Narciso Pipoca')
        cy.get('input#company').type(`PGTAS ${faker.company.name()}`)
        //cy.get('input#company').type('PGTAS')
        cy.get('input#address1').type(faker.location.streetAddress())
        //cy.get('input#address1').type('Avenida Selenium, n 2004')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        //cy.get('input#state').type('California')
        cy.get('input#city').type(faker.location.city())
        //cy.get('input#city').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        //cy.get('[data-qa="zipcode"]').type('90001')
        cy.get('[data-qa="mobile_number"]').type('111 222 333')

        //Act
        cy.get('[data-qa="create-account"]').click()

        //Assert
        cy.url().should('includes', 'account_created')

        cy.contains('b', 'Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')

        //Consulta ao banco ao api
        
})

//Test Case 2: Login User with correct email and password
it('Login de Usuário com e-mail e senha corretos', () => {    
    cy.get('[data-qa="login-email"]').type(`qa-tester-1759748644221@test.com`)
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()
    cy.get('i.fa-user').parent().should('contain.text', 'QA Tester')
    cy.get('a[href="/logout"]').should('be.visible')
    cy.contains('b', 'QA Tester')

    cy.get(':nth-child(10) > a')
        .should('be.visible')
        .and('have.text', ` Logged in as QA Tester`)

    cy.contains('b', 'QA Tester')
    cy.contains(`Logged in as QA Tester`).should('be.visible')
    cy.contains('Logged in as QA Tester').should('be.visible')        
});

//Test Case 3: Login User with incorrect email and password
it('Login de Usuário com e-mail e senha incorretos', () => {
    cy.get('[data-qa="login-email"]').type(`qa-tester-1759748644221@test.com`)
    cy.get('[data-qa="login-password"]').type('54321')
    cy.get('[data-qa="login-button"]').click()
    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
});

//Test Case 4: Logout User
it('Logout de Usuário', () => {
    cy.get('[data-qa="login-email"]').type(`qa-tester-1759748644221@test.com`)
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()
    cy.get('i.fa-user').parent().should('contain.text', 'QA Tester')
    cy.get('a[href="/logout"]').should('be.visible').click()

    cy.url().should('contain', 'login')

    
});

//Test Case 5: Register User with existing email
it('Cadastrar Usuário com e-mail existente', () => {
    cy.get('[data-qa="signup-name"]').type(`QA Tester`)
    cy.get('[data-qa="signup-email"]').type('qa-tester-1759748644221@test.com')
    cy.contains('button', 'Signup').click()
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')

});

//Com Arquivo - Upload de arquivo
it('Envia um Formulário de Contato com upload de arquivo', () => {
    cy.get(`a[href*=contact]`).click()

    cy.get('[data-qa="name"]').type(userData.name)
    cy.get('[data-qa="email"]').type(userData.email)
    cy.get('[data-qa="subject"]').type(userData.subject)
    cy.get('[data-qa="message"]').type(userData.message)

    cy.fixture('example.json').as('arquivo')
    cy.get('input[type=file]').selectFile('@arquivo')

    cy.get('[data-qa="submit-button"]').click()

    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    

});

})

/*
CÓDIGO SEM ESTRUTURAÇÃO - PRIMEIRA VEZ
describe('Automation Exercise', () => {
    it('Cadastrar um usuario', () => {
        const timestamp = new Date().getTime()

        cy.viewport('iphone-xr')

        cy.visit('https://www.automationexercise.com/')

        cy.get('a[href="/login"]').click()
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"').type(`qa-tester-${timestamp}@test.com`)
        cy.contains('button', 'Signup').click()


        //cy.get('input[type=radio]').check('Mrs')
        cy.get('#id_gender1').check()

        cy.get('input#password').type('12345', { log: false})

        //para comboboxes ou selects-> select
        cy.get('select[data-qa=days]').select('20')
        cy.get('select[data-qa=months]').select('September')
        cy.get('select[data-qa=years]').select('1992')

        //radio ou checkboxes -> check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type('Bob')
        cy.get('input#last_name').type('Narciso Pipoca')
        cy.get('input#company').type('PGTAS')
        cy.get('input#address1').type('Avenida Selenium, n 2004')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type('California')
        cy.get('input#city').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('90001')
        cy.get('[data-qa="mobile_number"]').type('111 222 333')

        //Act
        cy.get('[data-qa="create-account"]').click()

        //Assert
        cy.url().should('includes', 'account_created')

        cy.contains('b', 'Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')

        //Consulta ao banco ao api
        
})

//Test Case 2: Login User with correct email and password
it('Login de Usuário com e-mail e senha corretos', () => {
    cy.visit('https://www.automationexercise.com/')
    cy.get('a[href="/login"]').click()
    cy.get('[data-qa="login-email"]').type(`qa-tester-1759748644221@test.com`)
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()
    cy.get('i.fa-user').parent().should('contain.text', 'QA Tester')
    cy.get('a[href="/logout"]').should('be.visible')
    cy.contains('b', 'QA Tester')

    cy.get(':nth-child(10) > a')
        .should('be.visible')
        .and('have.text', ` Logged in as QA Tester`)

    cy.contains('b', 'QA Tester')
    cy.contains(`Logged in as QA Tester`).should('be.visible')
    cy.contains('Logged in as QA Tester').should('be.visible')        
});

//Test Case 3: Login User with incorrect email and password
it('Login de Usuário com e-mail e senha incorretos', () => {
    cy.visit('https://www.automationexercise.com/')
    cy.get('a[href="/login"]').click()
    cy.get('[data-qa="login-email"]').type(`qa-tester-1759748644221@test.com`)
    cy.get('[data-qa="login-password"]').type('54321')
    cy.get('[data-qa="login-button"]').click()
    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
});

//Test Case 4: Logout User
it('Logout de Usuário', () => {
    cy.visit('https://www.automationexercise.com/')
    cy.get('a[href="/login"]').click()

    cy.get('[data-qa="login-email"]').type(`qa-tester-1759748644221@test.com`)
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()
    cy.get('i.fa-user').parent().should('contain.text', 'QA Tester')
    cy.get('a[href="/logout"]').should('be.visible').click()

    cy.url().should('contain', 'login')

    
});

//Test Case 5: Register User with existing email
it.only('Cadastrar Usuário com e-mail existente', () => {
    cy.visit('https://www.automationexercise.com/')
    cy.get('a[href="/login"]').click()

    cy.get('[data-qa="signup-name"]').type(`QA Tester`)
    cy.get('[data-qa="signup-email"]').type('qa-tester-1759748644221@test.com')
    cy.contains('button', 'Signup').click()
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')

});
})

*/