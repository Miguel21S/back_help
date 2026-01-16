import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Classrooms1768497823105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: 'classrooms',
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
                            name: 'type',
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
                            name: 'UQ_classroom_name_location',
                            columnNames: ['name', 'location']
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('classrooms')
    }

}
