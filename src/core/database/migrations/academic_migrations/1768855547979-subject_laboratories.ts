import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SubjectLaboratories1768855547979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'subject_laboratories',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'hours',
                        type: 'tinyint',
                        isNullable: false
                    },
                    {
                        name: 'mandatory',   /// Si la práctica es obligatorio
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'subject_id',
                        type: 'int',
                        isNullable: false

                    },
                    {
                        name: 'laboratory_id',
                        type: 'int',
                        isNullable: false

                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['subject_id'],
                        referencedTableName: 'subjects',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    },
                    {
                        columnNames: ['laboratory_id'],
                        referencedTableName: 'laboratories',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('subject_laboratories')
    }

}
