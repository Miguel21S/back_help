import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Groups1768517515202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: 'groups',
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
                            length: '10'
                        },
                        {
                            name: 'year',
                            type: 'smallint',
                            isNullable: true
                        },
                        {
                            name: 'semester',
                            type: 'tinyint',
                            isNullable: true
                        },
                        {
                            name: 'isActive',
                            type: 'boolean',
                            default: true
                        },
                        {
                            name: "deletedAt",
                            type: "timestamp",
                            isNullable: true
                        },
                        {
                            name: 'subject_id',
                            type: 'int',
                            default: true
                        },
                    ],
                    uniques: [
                        {
                            name: 'UQ_group_subject_year_semester',
                            columnNames: ['name', 'subject_id', 'year', 'semester']
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ['subject_id'],
                            referencedTableName: 'subjects',
                            referencedColumnNames: ['id'],
                            onDelete: 'RESTRICT'
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('groups')
    }

}
