## Backend

### Requisitos Funcionais

- [x] Deve ser possível realizar cadastro;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter dados do perfil logado;
- [x] Deve ser possível fazer upload de arquivo(arquivos das transações);
- [x] Deve ser possível fazer o parsing do arquivo recebido e normalizar os dados;
- [x] Deve ser possível armazenar os dados normalizados no banco de dados seguindo as definições de interpretação do arquivo;
- [x] Deve ser possível exibir a lista das transações de produtos importadas por produtor/afiliado com um totalizador do valor das transações realizadas;

### Regras de Negócio

- [x] O usuário não deve poder se cadastrar com o mesmo e-mail mais de uma vez;
- [x] O usuário não deve confirmar o envio do formulário anexando o arquivo vazio;
- [x] O usuário não pode acessar o formulário de upload sem estar logado na aplicação;
- [x] O usuário deve poder listar as transações de produtos importadas por produtor/afiliado, com um totalizador do valor das transações realizadas;
- [x] Os produtos importados devem possuir um saldo para contabilizar o total das transações(vendas e pagamento das comissões).
- [x] O usuário não poderá cadastrar o mesmo produto duas vezes.

### Requisitos Não Funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados relacional;
- [x] Todas as listas de dados precisam estar paginadas em 20 itens por página;
- [x] O usuário deve ser identificado por um JWT;
- [x] A aplicação deve utilizar docker para gerenciar os diferentes serviços. Configurar docker-compose;
- [ ] O usuário poderá cadastrar as transações de maneira manual através de um formulário;

## Frontend

### Requisitos Funcionais

- [ ] Deve possuir uma tela de apresentação da plataforma;
- [x] Deve possuir uma tela para efetuar login via formulário;
- [x] Deve possuir validação de e-mail no cadastro;
- [ ] Deve possuir validação de e-mail existente antes de realizar o cadastro;
- [x] O usuário deve ser redirecionado para a página de login caso tente acessar alguma rota que necessite estar logado;
- [x] Deve possuir uma tela para upload do arquivo via formulário;
- [x] Deve possuir uma tela para listagem das transações por produtor/afiliado;

### Requisitos Não Funcionais

- [x] No formulário de login deve conter opção para cadastro;
- [x] O formulário de upload deve possuir validação e impedir o submit vazio ou contendo arquivo vazio;
