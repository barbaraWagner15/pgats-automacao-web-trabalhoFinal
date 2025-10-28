# pgats-automacao-web-trabalhoFinal

Este repositório git têm um projeto de automação web com cypress, utilizando a página: https://www.automationexercise.com/

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/barbaraWagner15/pgats-automacao-web-trabalhoFinal
   ```
2. Instale as dependências:
   ```sh
   npm install -D cypress@13.7.3
   ```

##  Rodar com interface

- Para abrir o cypress com a interface:
  ```sh
  npx cypress open
  ```
- Após abrir, você escolhe o navegador (utilizei Electron)

##  Rodar sem interface

- Para abrir o cypress sem a interface:
  ```sh
  npx cypress run


## Testes

Este trabalho final está implementado em automation-exercise-modules.cy.js e possui os seguintes testes:

-1.Cadastrar um usuário
-2.Login de Usuário com e-mail e senha corretos
-3.Login de Usuário com e-mail e senha incorretos
-4.Logout de Usuário
-5.Cadastrar Usuário com e-mail existente
-6.Envia um Formulário de Contato com upload de arquivo
-8.Verifique todos os produtos e a página de detalhes do produto
-9.Pesquisar produto
-10.Verificar assinatura na página inicial
-15.Fazer pedido: Registre-se antes de finalizar a compra