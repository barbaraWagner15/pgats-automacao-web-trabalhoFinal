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
//import {navegarParaLogin} from '../modules/menu'

//import {preencherFormularioDePreCadastro} from '../modules/login'
import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import contato from '../modules/contato'
import carrinho from '../modules/carrinho'


describe('Automation Exercise', () => {
    //BEFOREEACH VAI RODAR ANTES DE CADA TODOS OS TESTES
    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://www.automationexercise.com/')
        menu.navegarParaLogin()  

        //quando usa commands
        //cy.navegarParaLogin()       
});

   // it('Exemplos de Logs', () => {
   //     cy.log(`STEP 1 :: PGATS AUTOMACAO WEB CY LOGH`)
   //     cy.log(`STEP 2 :: PGATS AUTOMACAO WEB CY LOGH`)

   //     cy.log(`getRandomNumber(): ${getRandomNumber()}`)
   //     cy.log(`getRandomEmail(): ${getRandomEmail()}`)

   //     cy.log(`Dog Breed: ${faker.animal.dog()}`)
   //     cy.log(`Cat Breed: ${faker.animal.cat()}`)
   //     cy.log(`FullName: ${faker.person.fullName()}`)
  //      cy.log(`FullName: ${faker.company.name()}`)

   //     cy.log(`Nome de usuário: ${userData.name}`)
   //     cy.log(`Email de usuário: ${userData.email}`)
        

       // throw new Error("");
    //    console.log('PGATS AUTOMACAO WEB CONSOLE LOG')  
   // })
//Test Case 1: Register User

it('1.Cadastrar um usuario', () => {
          
//preencher formulariuo de pré-cadastro
       // const firstName = faker.person.firstName()
       // const lastName = faker.person.lastName()      
       // cy.get('[data-qa="signup-name"]').type('QA Tester')
       // cy.get('[data-qa="signup-email"').type(getRandomEmail())
       // cy.contains('button', 'Signup').click()
login.preencherFormularioDePreCadastro()
//       preencherFormularioDePreCadastro()

//preencher formulario de cadatro completo
cadastro.PreencherFormularioDeCadastroCompleto()
        //cy.get('input[type=radio]').check('Mrs')
        //cy.get('#id_gender1').check()

        //cy.get('input#password').type('12345', { log: false})

        //para comboboxes ou selects-> select
        //cy.get('select[data-qa=days]').select('20')
        //cy.get('select[data-qa=months]').select('September')
        //cy.get('select[data-qa=years]').select('1992')

        //radio ou checkboxes -> check
        //cy.get('input[type=checkbox]#newsletter').check()
        //cy.get('input[type=checkbox]#optin').check()

        //cy.get('input#first_name').type(faker.person.firstName())
        //cy.get('input#first_name').type('Bob')
        //cy.get('input#last_name').type(faker.person.lastName())
        //cy.get('input#last_name').type('Narciso Pipoca')
        //cy.get('input#company').type(`PGTAS ${faker.company.name()}`)
        //cy.get('input#company').type('PGTAS')
        //cy.get('input#address1').type(faker.location.streetAddress())
        //cy.get('input#address1').type('Avenida Selenium, n 2004')
        //cy.get('select#country').select('Canada')
        //cy.get('input#state').type(faker.location.state())
        //cy.get('input#state').type('California')
        //cy.get('input#city').type(faker.location.city())
        //cy.get('input#city').type('Los Angeles')
        //cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        //cy.get('[data-qa="zipcode"]').type('90001')
        //cy.get('[data-qa="mobile_number"]').type('111 222 333')

        //Act
        //cy.get('[data-qa="create-account"]').click()

        //Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')

        //Consulta ao banco ao api
        
});

//Test Case 2: Login User with correct email and password
it('2.Login de Usuário com e-mail e senha corretos', () => {    
    //cy.get('[data-qa="login-email"]').type(`qa-tester-1759748644221@test.com`)
    //cy.get('[data-qa="login-password"]').type('12345')
    //cy.get('[data-qa="login-button"]').click()

    login.preencherFormularioDeLogin(userData.user, userData.password)

    //const nomeDoUsuario = "QA Tester"

    cy.get('i.fa-user').parent().should('contain', userData.name)
    cy.get('a[href="/logout"]').should('be.visible')
    //cy.contains('b', 'QA Tester')

    cy.get(':nth-child(10) > a')
        .should('be.visible')
        .and('have.text', ` Logged in as ${userData.name}`);

    cy.contains('b', userData.name)
    cy.contains(`Logged in as ${userData.name}`).should('be.visible')
    cy.contains(`Logged in as ${userData.name}`).should('be.visible')        
});

//Test Case 3: Login User with incorrect email and password
it('3.Login de Usuário com e-mail e senha incorretos', () => {
    //cy.get('[data-qa="login-email"]').type(`qa-tester-1759748644221@test.com`)
    //cy.get('[data-qa="login-password"]').type('54321')
    //cy.get('[data-qa="login-button"]').click()
login.preencherFormularioDeLogin(userData.user, '54321')

    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
});

//Test Case 4: Logout User
it('4.Logout de Usuário', () => {
    //cy.get('[data-qa="login-email"]').type(`qa-tester-1759748644221@test.com`)
    //cy.get('[data-qa="login-password"]').type('12345')
    //cy.get('[data-qa="login-button"]').click()

    login.preencherFormularioDeLogin(userData.user, userData.password)

    //cy.get('i.fa-user').parent().should('contain.text', 'QA Tester')
    menu.efetuarLogout()
    //cy.get('a[href="/logout"]').should('be.visible').click()

    cy.url().should('contain', 'login')
    cy.contains('Login to your account')
    cy.get('a[href="/logout"]').should('not.exist')
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')

    
});

//Test Case 5: Register User with existing email
it('5.Cadastrar Usuário com e-mail existente', () => {
    cy.get('[data-qa="signup-name"]').type(`QA Tester`)
    cy.get('[data-qa="signup-email"]').type('qa-tester-1759748644221@test.com')
    cy.contains('button', 'Signup').click()
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')

});

//Com Arquivo - Upload de arquivo
it('6.Envia um Formulário de Contato com upload de arquivo', () => {
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

it('8.Verifique todos os produtos e a página de detalhes do produto', () => {
        menu.pesquisarPorProduto();
        cy.get('.features_items .product-image-wrapper').should('have.length', 34)
 
        // Clica no link 'View Product' do primeiro produto da lista
        cy.get('.features_items .product-image-wrapper').first().contains('View Product').click();
        cy.url().should('include', '/product_details/1');
 
        // Agrupa as asserções dentro do escopo do elemento '.product-information'
        cy.get('.product-information').should('be.visible')
            .within(() => {
                cy.get('h2').should('have.text', 'Blue Top');
                cy.contains('p', 'Category:').should('be.visible');
                cy.get('span').contains('Rs. 500').should('be.visible');
                cy.contains('p', 'Availability:').should('contain.text', 'In Stock');
                cy.contains('p', 'Condition:').should('contain.text', 'New');
                cy.contains('p', 'Brand:').should('contain.text', 'Polo');
            });
    });
 
    it('9.Pesquisar produto', () => {
        menu.pesquisarPorProduto();
 
        cy.get('[id="search_product"]').type('blue top');
        cy.get('[id="submit_search"]').click();
        cy.get('.features_items .product-image-wrapper').should('have.length', 1);
        cy.url().should('include', '/products?search=blue%20top');
 
        // Verifica o título e os detalhes do produto encontrado
        cy.get('.features_items').within(() => {
            cy.get('.title').should('have.text', 'Searched Products');
            cy.get('.productinfo img').should('be.visible');
            cy.get('.productinfo p').should('contain.text', 'Blue Top');
        });
    });

    it('10.Verificar assinatura na página inicial', () => {
            cy.get('.single-widget > h2').should('be.visible').and('have.text', 'Subscription')
            cy.get('#susbscribe_email').type(faker.internet.email())
            cy.get('#subscribe').click()
            cy.get('.alert-success').should('be.visible').and('contain.text', 'You have been successfully subscribed!')
     })
    
    it('15.Fazer pedido: Registre-se antes de finalizar a compra', () => {
             //const userEmail = faker.internet.email();
            // const userPassword = getPass();
    
            // Iniciar o processo de cadastro
            login.preencherFormularioDePreCadastro()

            //Cadastro completo    
            cadastro.PreencherFormularioDeCadastroCompleto()

            // Verificar se a conta foi criada com sucesso
            cy.url().should('includes', 'account_created');
            cy.get('b').should('have.text', 'Account Created!');
    
            // Adicionar produto ao carrinho
            carrinho.adicionatProdutoNoCarrinho();
            carrinho.abrirCarrinhoComModal();
            carrinho.verificarPaginaCarrinho();

            carrinho.fazerCheckout();
            carrinho.verificarCheckoutEstaPronto();

            carrinho.pedidoEPagamaneto({ message: 'Seu pedido foi feito com sucesso!' });
            carrinho.deletarConta();
    })

});

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