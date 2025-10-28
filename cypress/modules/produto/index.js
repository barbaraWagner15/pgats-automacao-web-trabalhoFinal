class Produto {

    adicionarProdutoNoCarrinho() {        
        cy.get('a[href="/products"]').click()
        cy.get('.features_items .product-image-wrapper').first().within(() => {
            cy.contains('a', 'Add to cart').click({ force: true })
        })
    }

    abrirCarrinho() {
        cy.get('div#cartModal').then(($modal) => {
            if ($modal.length && $modal.is(':visible')) {
                cy.wrap($modal).contains('a', 'View Cart').click({ force: true })
            } else {
                cy.get('a[href="/view_cart"]').first().click({ force: true })
            }
        })
    }   

    fazerCheckout() {
        cy.contains('a', 'Proceed To Checkout').click()
        cy.url({ timeout: 10000 }).should('include', '/checkout')
    }

    verificarCheckoutEstaPronto() {
        cy.get('body', { timeout: 10000 }).then(($body) => {
            if ($body.find('.checkout-address').length) {
                cy.get('.checkout-address').should('exist')
            } else if ($body.find('a').filter((i, el) => el.innerText.includes('Place Order')).length) {
                cy.log('Place Order link found — continuing')
            } else {
                cy.get('input[name="name_on_card"]', { timeout: 10000 }).should('exist')
            }
        })
    }

    pedidoEPagamaneto({ message = 'Por favor, entregue entre 9h e 18h',
                       name_on_card = 'Test Barbara',
                       card_number = '1234567891234567',
                       cvc = '012',
                       expiry_month = '02',
                       expiry_year = '2035' } = {}) {
        cy.get('textarea[name="message"]').type(message)
        cy.contains('a', 'Place Order').click()

        cy.get('input[name="name_on_card"]').type(name_on_card)
        cy.get('input[name="card_number"]').type(card_number)
        cy.get('input[name="cvc"]').type(cvc)
        cy.get('input[name="expiry_month"]').type(expiry_month)
        cy.get('input[name="expiry_year"]').type(expiry_year)

        cy.contains('button', 'Pay and Confirm Order').click()

        cy.get('body', { timeout: 10000 }).then(($body) => {
            const text = $body.text()
            if (text.includes('Your order has been placed successfully') || text.includes('Congratulations! Your order has been confirmed')) {
                cy.log('Order success message found')
            } else {
                throw new Error('Order success message not found on page')
            }
        })
    }
}

export default new Produto()
