# Oficina API

API de oficina mecânica feita com NestJS e PostgreSQL.
Módulos: clientes, veículos e ordens de serviço.

## Requisitos

- Node.js 20 ou superior
- PostgreSQL instalado e em execução (porta 5432)

## Como rodar

1. Clone o repositório e instale as dependências:

```bash
git clone https://github.com/SEU_USUARIO/Trabalho-Oficina-POO.git
cd Trabalho-Oficina-POO
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

## Consultas

curl http://localhost:3000/ordens-servico
curl http://localhost:3000/veiculos/1

## Testes

Os comandos abaixo usam `\"` nas aspas do JSON, que é o formato do cmd do Windows. Rode o seed antes (`npx ts-node src/seed.ts`) e deixe a API ligada.

Cadastrar um cliente e um veículo:

```bash
curl -X POST http://localhost:3000/clientes -H "Content-Type: application/json" -d "{\"nome\":\"Ana Costa\",\"telefone\":\"(66) 99999-0000\"}"
```

```bash
curl -X POST http://localhost:3000/veiculos -H "Content-Type: application/json" -d "{\"placa\":\"mno5p67\",\"modelo\":\"VW Gol\",\"ano\":2017,\"clienteId\":4}"
```

Testar a regra principal. A ordem 3 não tem valor, então este comando deve falhar com 400:

```bash
curl -X PATCH http://localhost:3000/ordens-servico/3/status -H "Content-Type: application/json" -d "{\"status\":\"CONCLUIDA\"}"
```

Defina o valor e tente de novo, agora com sucesso:

```bash
curl -X PATCH http://localhost:3000/ordens-servico/3/valor -H "Content-Type: application/json" -d "{\"valor\":420.00}"
```

```bash
curl -X PATCH http://localhost:3000/ordens-servico/3/status -H "Content-Type: application/json" -d "{\"status\":\"CONCLUIDA\"}"
```