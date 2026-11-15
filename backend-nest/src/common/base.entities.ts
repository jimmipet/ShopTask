import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AuditableEntity {
  @Column({
    name: 'creation_date',
    type: 'timestamptz',
    default: () => 'now()',
  })
  creationDate: Date;

  @Column({
    name: 'modification_date',
    type: 'timestamptz',
    default: () => 'now()',
  })
  modificationDate: Date;
}

export abstract class IdentityEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
}

export abstract class UuidEntity extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
