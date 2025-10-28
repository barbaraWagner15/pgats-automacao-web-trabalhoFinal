class Menu{
     navegarParaLogin(){
          cy.get('a[href="/login"]').click();
     }

     efetuarLogout(){
        cy.get('a[href="/logout"]').should('be.visible').click();
     }
     
     pesquisarPorProduto(){
        cy.get('a[href="/products"]').click();
        cy.url().should('include', '/products');
        cy.get('.features_items').should('be.visible')
     }
}

export default new Menu()