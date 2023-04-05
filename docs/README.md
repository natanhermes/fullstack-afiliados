## Backend

### Requisitos Funcionais

- [ ] Deve ser possível solicitar cadastro;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível gerenciar níveis de acesso na aplicação(usuário admin e colaborador);
- [ ] Deve ser possível obter dados do perfil logado;
- [ ] Deve ser possível fazer upload de arquivo(foto de perfil, arquivos das transações);
- [ ] Deve ser possível fazer o parsing do arquivo recebido e normalizar os dados;
- [ ] Deve ser possível armazenar os dados normalizados no banco de dados seguindo as definições de interpretação do arquivo;
- [ ] Deve ser possível exibir a lista das transações de produtos importadas por produtor/afiliado com um totalizador do valor das transações realizadas;

### Regras de Negócio

- O usuário não deve poder solicitar acesso com o mesmo e-mail mais de uma vez;
- O usuário não deve ser cadastrado com e-mail duplicado;
- O usuário não deve confirmar o envio do formulário anexando o arquivo vazio;
- O usuário não pode acessar o formulário de upload sem estar logado na aplicação;
- O usuário não deve conseguir visualizar oo formlário de cadastro de usuário, apenas administradores;
- O usuário administrador deve poder listar as transações de produtos importadas de todos os afiliados;
- O usuário administrador deve poder listar as transações de produtos importadas por produtor/afiliado, com um totalizador do valor das transações realizadas;

### Requisitos Não Funcionais

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco de dados relacional;
- [ ] Todas as listas de dados precisam estar paginadas em 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;
- [ ] A aplicação deve utilizar docker para gerenciar os diferentes serviços. Configurar docker-compose;

## Frontend

### Requisitos Funcionais

- [ ] Deve possuir uma tela de apresentação da plataforma;
- [ ] Deve possuir uma tela para efetuar login via formulário;
- [ ] Deve possuir uma tela para solicitar as credenciais via e-mail;
- [ ] Deve possuir validação de e-mail existente antes de enviar solicitação das credenciais;
- [ ] Deve possuir tela de acesso não autorizado caso não tenha efetuado login ou a sessão tenha sido expirada;
- [ ] Deve possuir uma tela para upload do arquivo via formulário;
- [ ] Deve possuir uma tela para listagem das transações por produtor/afiliado;

### Requisitos Não Funcionais

- [ ] No formulário de login deve conter opção para solicitar credenciais de acesso caso o usuário não possua;
- [ ] Deve enviar as credencias de login via e-mail fornecido;
- [ ] O formulário de upload deve possuir validação e impedir o submit vazio;
