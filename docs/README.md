## Backend

### Requisitos Funcionais

- [x] Deve ser possível realizar cadastro;
- [x] Deve ser possível se autenticar;
- [ ] Deve ser possível gerenciar níveis de acesso na aplicação(usuário admin e colaborador(afiliado e produtor));
- [ ] Deve ser possível obter dados do perfil logado;
- [ ] Deve ser possível fazer upload de arquivo(foto de perfil, arquivos das transações);
- [ ] Deve ser possível fazer o parsing do arquivo recebido e normalizar os dados;
- [ ] Deve ser possível armazenar os dados normalizados no banco de dados seguindo as definições de interpretação do arquivo;
- [ ] Deve ser possível exibir a lista das transações de produtos importadas por produtor/afiliado com um totalizador do valor das transações realizadas;

### Regras de Negócio

- O usuário não deve poder se cadastrar com o mesmo e-mail mais de uma vez;
- O usuário não deve confirmar o envio do formulário anexando o arquivo vazio;
- O usuário não pode acessar o formulário de upload sem estar logado na aplicação;
- O usuário deve poder listar as transações de produtos importadas por produtor/afiliado, com um totalizador do valor das transações realizadas;
- Os produtos importados devem possuir um saldo para contabilizar o total das transações(vendas e pagamento das comissões).

### Requisitos Não Funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados relacional;
- [ ] Todas as listas de dados precisam estar paginadas em 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;
- [x] A aplicação deve utilizar docker para gerenciar os diferentes serviços. Configurar docker-compose;

## Frontend

### Requisitos Funcionais

- [ ] Deve possuir uma tela de apresentação da plataforma;
- [ ] Deve possuir uma tela para efetuar login via formulário;
- [ ] Deve possuir validação de e-mail existente antes de realizar o cadastro;
- [ ] Deve possuir tela de acesso não autorizado caso não tenha efetuado login ou a sessão tenha sido expirada;
- [ ] Deve possuir uma tela para upload do arquivo via formulário;
- [ ] Deve possuir uma tela para listagem das transações por produtor/afiliado;

### Requisitos Não Funcionais

- [ ] No formulário de login deve conter opção para cadastro;
- [ ] O formulário de upload deve possuir validação e impedir o submit vazio ou contendo arquivo vazio;
