/// <reference types="cypress" />

/*
HOOKS / GANCHOS
    BEFORE-> ANTES DE TODOS OS TESTES
    BEFORE EACH -> ANTES DE CADA TESTE
    AFTER -> DEPOIS DE TODOS OS TESTES
    AFTER EACH -> DEPOIS DE CADA TESTE  
*/

import userData from '../fixtures/example.json'
import { faker } from '@faker-js/faker'
import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import produto from '../modules/produto'

describe('Automation Exercise', () => {
    //BEFOREEACH VAI RODAR ANTES DE CADA TODOS OS TESTES
    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://www.automationexercise.com/')
        menu.navegarParaLogin()     
});

//Test Case 1: Register User
    it('1.Cadastrar um usuario', () => {
        login.preencherFormularioDePreCadastro()
        cadastro.PreencherFormularioDeCadastroCompleto()
        //Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    });

//Test Case 2: Login User with correct email and password
    it('2.Login de Usuário com e-mail e senha corretos', () => {    
        login.preencherFormularioDeLogin(userData.user, userData.password)

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
        cy.get(':nth-child(10) > a')
            .should('be.visible')
            .and('have.text', ` Logged in as ${userData.name}`);

        cy.contains('b', userData.name)
        cy.contains(`Logged in as ${userData.name}`).should('be.visible')
        cy.contains(`Logged in as ${userData.name}`).should('be.visible')        
    });

//Test Case 3: Login User with incorrect email and password
    it('3.Login de Usuário com e-mail e senha incorretos', () => {
        login.preencherFormularioDeLogin(userData.user, '54321')

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    });

//Test Case 4: Logout User
    it('4.Logout de Usuário', () => {
        login.preencherFormularioDeLogin(userData.user, userData.password)
        menu.efetuarLogout()

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

//Test Case 6: Contact Us Form
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

//Test Case 8: Verify All Products and product detail page
    it('8.Verifique todos os produtos e a página de detalhes do produto', () => {
        menu.pesquisarPorProduto();

        cy.get('a[href="/product_details/1"]').click()
        cy.url().should('include', '/product_details/1');
        cy.get('.product-information > h2').should('contain', 'Blue Top')
        cy.get('.product-information > :nth-child(3)').should('contain', 'Category: Women > Tops')
        cy.get(':nth-child(5) > span').should('contain', 'Rs. 500')
        cy.get('.product-information > :nth-child(6)').should('contain', 'In Stock')
        cy.get('.product-information > :nth-child(7)').should('contain', 'New')
        cy.get('.product-information > :nth-child(8)').should('contain', 'Polo')
    });

//Test Case 9: Search Product
    it('9.Pesquisar produto', () => {
        menu.pesquisarPorProduto();
 
        cy.get('[id="search_product"]').type('blue top');
        cy.get('[id="submit_search"]').click();
        cy.get('.features_items .product-image-wrapper').should('have.length', 1);
        cy.url().should('include', '/products?search=blue%20top'); 
        cy.get('.features_items').within(() => {
            cy.get('.title').should('have.text', 'Searched Products');
            cy.get('.productinfo img').should('be.visible');
            cy.get('.productinfo p').should('contain.text', 'Blue Top');
        });
    });

//Test Case 10: Verify Subscription in Home Page
    it('10.Verificar assinatura na página inicial', () => {
        cy.get('.single-widget > h2').should('contain', 'Subscription')
        cy.get('#susbscribe_email').type(faker.internet.email())
        cy.get('#subscribe').click()
        cy.get('.alert-success').should('be.visible')
    });
    
//Test Case 15: Place Order: Register before Checkout
    it('15.Fazer pedido: Registre-se antes de finalizar a compra', () => {
        login.preencherFormularioDePreCadastro()
        cadastro.PreencherFormularioDeCadastroCompleto()
        cadastro.ContaCriadaComSucesso()
    
        produto.adicionarProdutoNoCarrinho();
        produto.abrirCarrinho();
        
        cy.url().should('include', '/view_cart')
        cy.get('.cart_info').should('be.visible')

        produto.fazerCheckout();
        produto.verificarCheckoutEstaPronto();
        produto.pedidoEPagamaneto({ message: 'Seu pedido foi feito com sucesso!' });
        
        cy.get('a[href="/delete_account"]').click()
        cy.get('b').should('contain', 'Account Deleted!')
        cy.url().should('include', 'delete_account')
    });
});