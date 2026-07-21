# Migração UniBus: MySQL → Supabase (PostgreSQL)

## O que foi analisado

O backend usa `mysql2` com queries SQL puras (`db.query(sql, params, callback)`), sem ORM. A boa notícia: **apenas `backend/src/database/connection.js` fala diretamente com o MySQL** — todos os 17 controllers importam esse mesmo `db` e chamam `db.query(...)`. Isso permitiu trocar o banco sem tocar em nenhum controller.

## O que mudou

1. **`backend/src/database/connection.js`** — reescrito para usar `pg` (driver oficial do Postgres) apontando para o Supabase, mas **mantendo a mesma assinatura** `db.query(sql, params, callback)` que todo o resto do código já usa. Ele faz automaticamente:
   - Conversão dos placeholders `?` (estilo MySQL) para `$1, $2, ...` (estilo Postgres).
   - Emulação de `result.insertId` (usado em `chamadoController`, `viagemController`, `motoristaController`, `adminController`) adicionando `RETURNING id` nos `INSERT`s.
   - `linhas.affectedRows` para manter paridade com o retorno do mysql2.

   👉 Resultado: **nenhum controller, model ou route precisou ser alterado.**

2. **`package.json`** — removido `mysql2`, adicionados `pg` e `dotenv`.

3. **`backend/.env.example`** — novo arquivo com a variável `DATABASE_URL` (a connection string antes ficava *hardcoded* dentro do `connection.js`, agora vem de variável de ambiente — mais seguro).

4. **`backend/src/database/schema_supabase.sql`** — schema Postgres reconstruído a partir de todas as queries `INSERT`/`SELECT`/`JOIN` encontradas no código (tabelas: `usuario`, `estudante`, `motorista`, `onibus`, `rota`, `ponto_rota`, `viagem`, `presenca`, `embarque`, `passageiro_viagem`, `localizacao_onibus`, `chamado`, `mensagem`).

## ⚠️ Ponto de atenção

O código usa **duas estruturas parecidas** para controlar presença/embarque: as tabelas `presenca` + `embarque` (mais antigas, usadas em `presencaController`/`embarqueController`) e a tabela `passageiro_viagem` (usada em `passageiroController`/`motoristaPassageirosController`/dashboard), que já tem `vai`, `volta` e `embarcado` juntos. Recriei as três porque as três são usadas no código, mas vale avaliar se isso não é uma duplicação que sobrou de uma refatoração incompleta — se for, dá pra consolidar tudo em `passageiro_viagem` depois.

## Passo a passo para rodar

### 1. Instalar as novas dependências
```bash
npm install
```
(remove o `mysql2` do `node_modules` e instala `pg` + `dotenv`, conforme o `package.json` atualizado)

### 2. Criar o schema no Supabase
No painel do Supabase → **SQL Editor** → cole o conteúdo de `backend/src/database/schema_supabase.sql` → **Run**.

### 2.1. (Opcional) Popular com dados de exemplo
Ainda no SQL Editor, rode também `backend/src/database/seed.sql`. Ele cria:
- 1 admin, 2 motoristas e 5 estudantes (login com senha `123456` para todos)
- 2 rotas (com pontos de parada), 2 ônibus, 2 viagens ativas de hoje
- presenças, embarques, localização do ônibus e um chamado com chat, já preenchidos

Assim dá pra logar com qualquer usuário de teste e ver o sistema funcionando de ponta a ponta (mapa, presença, embarque, chamados) sem precisar cadastrar nada manualmente antes.

> ⚠️ Reparei que o login hoje compara a senha em texto puro (`WHERE senha = ?`, sem hash). Funciona para os testes, mas antes de ir pra produção vale trocar por bcrypt — se quiser, eu ajudo com isso depois.

### 3. Configurar a connection string
Copie `backend/.env.example` para `backend/.env` e preencha com a sua connection string (Supabase → **Project Settings → Database → Connection string → URI**):

```
DATABASE_URL=postgresql://postgres:[SUA_SENHA]@[HOST]:5432/postgres
```

> Dica: se for hospedar em um serviço que não suporta bem IPv6 (Render, Railway free tier, etc.), use a connection string do **"Session pooler"** (porta 6543) em vez da conexão direta (porta 5432) — o Supabase mostra as duas opções na mesma tela.

### 4. Rodar o backend normalmente
```bash
node backend/src/app.js
# ou, se você tinha um script configurado:
npm run dev
```
Você deve ver no console: `Conectado ao Supabase (PostgreSQL) com sucesso!`

### 5. Testar as rotas principais
Cadastro, login, criação de rota/ônibus/viagem — para confirmar que os `INSERT` (que dependem do `RETURNING id`) estão retornando o id certo.

## Diferenças MySQL → Postgres que já foram tratadas
- `?` → `$1, $2, ...` (feito automaticamente pelo adapter)
- `AUTO_INCREMENT` → `GENERATED ALWAYS AS IDENTITY`
- `result.insertId` → emulado via `RETURNING id`
- Sem uso de crases (`` ` ``) nem sintaxe MySQL-específica (`LIMIT x,y`, `DATE_FORMAT`, `GROUP_CONCAT`) no código — não havia nada disso, então não precisou de ajuste manual nas queries.

## Se no futuro você quiser dados reais migrados (não é o caso agora)
Quando o projeto sair do ambiente de desenvolvimento e tiver dados reais no MySQL, dá pra usar uma ferramenta como o [`pgloader`](https://pgloader.io/) para migrar os dados automaticamente do MySQL para o Postgres do Supabase, respeitando esse mesmo schema.
