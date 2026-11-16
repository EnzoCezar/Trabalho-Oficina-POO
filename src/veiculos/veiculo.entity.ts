import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';

@Entity('veiculos')
export class Veiculo {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    placa: string;
    
    @Column()
    modelo: string;
    
    @Column()
    ano: number;
    
    @Column({ name: 'cliente_id' })
    clienteId: number;
    
    @ManyToOne(() => Cliente, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;
}