# Projeto WhatsApp

Este é um projeto desenvolvido com o framework **NestJS**, que tem como objetivo integrar e gerenciar mensagens enviadas e recebidas via WhatsApp. Ele utiliza uma arquitetura modular e escalável, com suporte a microserviços, banco de dados relacional e comunicação assíncrona via RabbitMQ.

## Funcionalidades

- **Gerenciamento de Contatos**: Criação e atualização de contatos no banco de dados.
- **Envio de Mensagens**: Envio de mensagens para números de WhatsApp utilizando uma API externa.
- **Recebimento de Mensagens**: Processamento de mensagens recebidas via webhook.
- **Controle de Conversas**: Início e término de conversas com base em comandos recebidos.
- **Integração com RabbitMQ**: Comunicação assíncrona para processamento de mensagens.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações Node.js escaláveis.
- **TypeScript**: Linguagem utilizada para desenvolvimento.
- **Prisma ORM**: Gerenciamento do banco de dados PostgreSQL.
- **RabbitMQ**: Comunicação assíncrona entre serviços.
- **Axios**: Biblioteca para requisições HTTP.
- **CacheModule**: Cache para armazenamento temporário de dados.
- **Jest**: Framework de testes.

## Estrutura do Projeto

- **src/**: Código-fonte principal do projeto.
- **prisma/**: Configuração do banco de dados e migrações.
- **test/**: Testes automatizados.
- **_projeto_api_whatsapp/**: Submódulo responsável por consumir mensagens de RabbitMQ e processá-las.

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/projeto_whatsapp.git
   cd projeto_whatsapp
   ```

2. Configure o submódulo:
   ```bash
   git submodule update --init --recursive
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com base no arquivo `.envExample`.
   - Configure as variáveis, como a URL do banco de dados, credenciais do RabbitMQ e API Key.

5. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

6. Inicie o servidor:
   ```bash
   npm run start:dev
   ```

## Endpoints Principais

### Webhook
- **POST /webhook**
  - Recebe mensagens e processa comandos como "Iniciar" e "Fim".

### Contatos
- **POST /contato**
  - Cria ou atualiza um contato no banco de dados.

### Mensagens
- **POST /mensagem**
  - Envia uma mensagem para um número de WhatsApp.

## Testes

Para executar os testes, utilize o comando:
```bash
npm run test
```

## Como Contribuir

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça as alterações e commit:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para dúvidas ou sugestões, entre em contato pelo e-mail: [seu-email@exemplo.com](mailto:seu-email@exemplo.com).