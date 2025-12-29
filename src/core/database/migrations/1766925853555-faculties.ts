import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Faculties1766925853555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "faculties",
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'name',
                            type: 'varchar',
                            length: '255',
                            isNullable: false,
                        },
                        {
                            name: 'dean',
                            type: 'varchar',
                            length: '100',
                            isNullable: true,
                        },
                        {
                            name: 'phone',
                            type: 'varchar',
                            length: '50',
                            isNullable: true,
                        },
                        {
                            name: 'email',
                            type: 'varchar',
                            length: '100',
                            isNullable: true,
                        },
                        {
                            name: 'date_creation',
                            type: 'date',
                            isNullable: false,
                        },
                        {
                            name: 'institution_id',
                            type: 'int',
                            isNullable: false,
                        }
                    ],
                    foreignKeys:[
                        {
                            columnNames: ['institution_id'],
                            referencedTableName: 'institutions',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE',
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("faculties");
    }

}
