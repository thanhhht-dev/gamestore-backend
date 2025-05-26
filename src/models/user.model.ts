import { Entity, PrimaryColumn, Column, CreateDateColumn, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // make sure this matches the actual table name
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'text', name: 'password_hash' })
  passwordHash!: string;

  @Column({ type: 'varchar', name: 'phone_number', length: 20, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 20, default: 'customer' })
  role!: string;

  @Column({ type: 'timestamp', name: 'birth_date', nullable: true })
  birthDate?: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;
}
