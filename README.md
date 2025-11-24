# Encontrei Backend

Um backend simples em Node.js + Express usando Prisma ORM e SQLite para desenvolvimento local. Este README foi escrito para quem nunca usou Node ou Prisma antes — siga os passos abaixo para rodar o projeto na sua máquina Windows (PowerShell).

**Porta padrão**: `5000` (definida em `PORT` no arquivo `.env`).

**Visão rápida das rotas**
- `GET /users` — lista usuários
- `GET /stores` — lista lojas
- `GET /products` — lista produtos
- `GET /reservations` — lista reservas
- `POST /reservations` — cria reserva (body JSON: `productId`, `buyerId`, `date`, `note`)

---

**Pré-requisitos (Windows / PowerShell)**
- Node.js (recomendado >= 16). Baixe em https://nodejs.org/
- npm (vem com o Node.js)
- Git (opcional, para clonar o repositório)

Se você não tiver Node instalado, instale a versão LTS a partir do site oficial. Depois abra o PowerShell.

**Passo a passo — configurar e rodar (PowerShell)**

1) Abra o PowerShell e entre na pasta do projeto:

```powershell
cd C:\Encontrei\Encontrei-backend
```

2) Instale as dependências do Node:

```powershell
npm install
```

3) Gerar o cliente do Prisma (necessário sempre que o schema mudar):

```powershell
npx prisma generate
```

4) Criar o banco de dados local e aplicar as migrations:

```powershell
npx prisma migrate dev --name init
```

Esse comando cria um arquivo `dev.db` (SQLite) na raiz do projeto e gera uma pasta `migrations/` com o histórico.

5) (Opcional) Se quiser popular o banco com dados de exemplo, rode o seed:

```powershell
node prisma/seed.js
```

O arquivo `prisma/seed.js` insere os usuários, lojas, produtos e reservas de exemplo. No seed atual, todas as senhas são `senha123` (apenas para desenvolvimento).

6) Inicie o servidor em modo desenvolvimento (nodemon):

```powershell
npm run dev
```

O servidor irá escutar na porta `5000`. Abra `http://localhost:5000/` no navegador ou use `curl`/Postman.

**Recriar o banco (limpar e repetir)**
- Para recriar o banco e aplicar migrations do zero, você pode rodar:

```powershell
npx prisma migrate reset --force
node prisma/seed.js
```

Esse comando remove os dados e recria o esquema. Alternativamente, pode apagar `dev.db` manualmente.

---

**Onde estão os esquemas e o seed**
- O esquema do banco (modelos) está em: `prisma/schema.prisma`.
- O script que popula dados de exemplo está em: `prisma/seed.js`.

Altere `prisma/schema.prisma` e, após mudanças, rode `npx prisma generate` e uma migration para aplicar as alterações.

---

**Estrutura do código: models / services / routes (o que é cada coisa)**

- `src/models` — camada de acesso ao banco (queries). Cada arquivo `*Model.js` usa o cliente Prisma para ler/gravar os dados. Ex.: `userModel.js`, `productModel.js`.

- `src/services` — lógica de negócio. Os serviços usam os models, aplicam validações e regras da aplicação. Ex.: `reservationService.js` verifica se o produto existe antes de criar uma reserva.

- `src/routes` — camada HTTP/Express. Aqui estão os endpoints (rotas) que recebem requisições, chamam os serviços e retornam respostas. Ex.: `productRoutes.js`, `reservationRoutes.js`.

Separando as responsabilidades dessa forma você facilita manutenção e testes: as rotas cuidam de HTTP, os services da lógica e os models do banco.

---

**Exemplos de uso rápido (PowerShell)**

Listar produtos:
```powershell
curl http://localhost:5000/products
```

Listar reservas:
```powershell
curl http://localhost:5000/reservations
```

Criar uma reserva (exemplo):
```powershell
curl -X POST http://localhost:5000/reservations -H "Content-Type: application/json" -d '{"productId":1,"buyerId":1,"date":"2025-03-01T10:00:00","note":"Teste"}'
```

---

**Segurança e notas importantes**
- Atualmente o seed salva as senhas em texto plano (`senha123`) apenas para facilitar testes locais. Em qualquer projeto real, você deve **hash** as senhas (ex.: `bcrypt`) antes de salvar e nunca expor a senha nas respostas da API.
- Não use `dev.db` em produção. Para produção, troque `DATABASE_URL` no `.env` para um banco adequado (Postgres, MySQL) e siga as práticas de segurança.

---

Se quiser, eu posso:
- atualizar o seed para salvar senhas hasheadas com `bcrypt`;
- ocultar o campo `password` nas respostas da API;
- adicionar endpoints de CRUD (criar/editar/excluir) para produtos e lojas.

Diga qual desses próximos passos você prefere que eu implemente agora.
