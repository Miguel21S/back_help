import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Laboratories1768497845536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: 'laboratories',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment'
                        },
                        {
                            name: 'name',
                            type: 'varchar',
                            length: '100',
                            isNullable: false
                        },
                        {
                            name: 'capacity',
                            type: 'int',
                            isNullable: false
                        },
                        {
                            name: 'location',
                            type: 'varchar',
                            length: '100',
                            isNullable: true
                        },
                        {
                            name: 'equipment',
                            type: 'varchar',
                            length: '100',
                            isNullable: false
                        },
                        {
                            name: "isActive",
                            type: "boolean",
                            default: true
                        },
                        {
                            name: "deletedAt",
                            type: "timestamp",
                            isNullable: true
                        },
                    ],
                    uniques: [
                        {
                            name: 'UQ_laboratory_name_location',
                            columnNames: ['name', 'location']
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('laboratories')
    }

}
