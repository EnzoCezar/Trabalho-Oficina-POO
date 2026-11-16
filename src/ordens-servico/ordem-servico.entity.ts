import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Veiculo } from '../veiculos/veiculo.entity';
import { StatusOrdem } from './status-ordem.enum';

@Entity('ordens_servico')
export class OrdemServico {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  descricao: string;
  
  @Column({ type: 'enum', enum: StatusOrdem, default: StatusOrdem.ABERTA })
  status: StatusOrdem;
  
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (value: number | null) => value,
      from: (value: string | null) => (value === null ? null : parseFloat(value)),
    },
  })
  valor: number | null;
  
  @Column({ name: 'veiculo_id' })
  veiculoId: number;

  @ManyToOne(() => Veiculo, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'veiculo_id' })
  veiculo: Veiculo;
  
  @CreateDateColumn({ name: 'data_abertura' })
  dataAbertura: Date;
  
  @Column({ name: 'data_conclusao', type: 'timestamp', nullable: true })
  dataConclusao: Date | null;
}