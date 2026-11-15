# Oficina API

API de oficina mecânica feita com NestJS e PostgreSQL.
Módulos: clientes, veículos e ordens de serviço.

## Requisitos

- Node.js 20 ou superior
- PostgreSQL instalado e em execução (porta 5432)

## Como rodar

1. Clone o repositório e instale as dependências:

```bash
git clone https://github.com/SEU_USUARIO/Projeto-2-POO.git
cd Projeto-2-POO
npm install
```

2. Crie o arquivo `.env` a partir do exemplo e coloque a senha do seu PostgreSQL:

```bash
copy .env.example .env
```

(no Linux/Mac: `cp .env.example .env`)

3. Popule o banco. O banco e as tabelas são criados automaticamente:

```bash
npx ts-node src/seed.ts
```

4. Inicie a API:

```bash
npm run start:dev
```

A API fica disponível em http://localhost:3000.

## Rotas

| Módulo | Método | Rota |
|---|---|---|
| clientes | GET | /clientes, /clientes/:id |
| clientes | POST, PUT, DELETE | /clientes, /clientes/:id |
| veiculos | GET | /veiculos, /veiculos/:id |
| veiculos | POST, PUT, DELETE | /veiculos, /veiculos/:id |
| ordens-servico | GET | /ordens-servico, /ordens-servico/:id |
| ordens-servico | POST | /ordens-servico |
| ordens-servico | PATCH | /ordens-servico/:id/valor, /ordens-servico/:id/status |
| ordens-servico | DELETE | /ordens-servico/:id |