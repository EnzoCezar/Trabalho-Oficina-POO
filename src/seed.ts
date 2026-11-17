import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ensureDatabase } from './ensure-database';
import { Cliente } from './clientes/cliente.entity';
import { Veiculo } from './veiculos/veiculo.entity';
import { OrdemServico } from './ordens-servico/ordem-servico.entity';
import { StatusOrdem } from './ordens-servico/status-ordem.enum';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Cliente, Veiculo, OrdemServico],
  synchronize: true,
});

async function seed() {
  await ensureDatabase();
  await dataSource.initialize();
  
  const clienteRepo = dataSource.getRepository(Cliente);
  const veiculoRepo = dataSource.getRepository(Veiculo);
  const ordemRepo = dataSource.getRepository(OrdemServico);
  
  await dataSource.query(
    'TRUNCATE TABLE ordens_servico, veiculos, clientes RESTART IDENTITY CASCADE',
  );
  
  const clientes = await clienteRepo.save([
    { nome: 'João Almeida', telefone: '(66) 99911-2233', email: 'joao@email.com' },
    { nome: 'Maria Santos', telefone: '(66) 99877-4455', email: 'maria@email.com' },
    { nome: 'Pedro Oliveira', telefone: '(66) 99654-8899', email: 'pedro@email.com' },
  ]);
  
  const veiculos = await veiculoRepo.save([
    { placa: 'ABC1D23', modelo: 'Fiat Uno', ano: 2015, clienteId: clientes[0].id },
    { placa: 'DEF4567', modelo: 'Honda Civic', ano: 2019, clienteId: clientes[0].id },
    { placa: 'GHI8J90', modelo: 'Toyota Hilux', ano: 2021, clienteId: clientes[1].id },
    { placa: 'JKL1234', modelo: 'Chevrolet Onix', ano: 2018, clienteId: clientes[2].id },
  ]);

  await ordemRepo.save([
    {
      descricao: 'Troca de óleo e filtros',
      status: StatusOrdem.CONCLUIDA,
      valor: 280.0,
      dataConclusao: new Date(),
      veiculoId: veiculos[0].id,
    },
    {
      descricao: 'Revisão do sistema de freios',
      status: StatusOrdem.EM_ANDAMENTO,
      valor: 650.5,
      veiculoId: veiculos[1].id,
    },
     {
      descricao: 'Barulho na suspensão dianteira',
      status: StatusOrdem.ABERTA,
      veiculoId: veiculos[2].id,
    },
    {
      descricao: 'Troca da correia dentada',
      status: StatusOrdem.ABERTA,
      valor: 890.0,
      veiculoId: veiculos[3].id,
    },
  ]);
  
  console.log('Seed concluído com sucesso!');
  await dataSource.destroy();
}

seed().catch((erro) => {
  console.error('Erro ao executar o seed:', erro);
  process.exit(1);
});

