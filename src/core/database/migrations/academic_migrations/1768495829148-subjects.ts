import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Subjects1768495829148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'subjects',
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
                        name: 'subject_code',
                        type: 'varchar',
                        length: '60',
                        isNullable: false
                    },
                    {
                        name: 'total_credits',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'semester',
                        type: 'varchar',
                        length: '60',
                        isNullable: false
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        length: '100',
                        isNullable: true
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '250',
                        isNullable: true
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
                    {
                        name: "faculty_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "dpto_academic_id",
                        type: "int",
                        isNullable: false
                    },
                ],
                uniques: [
                    {
                        name: 'UQ_subject_code',
                        columnNames: ['subject_code']
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['faculty_id'],
                        referencedTableName: 'faculties',
                        referencedColumnNames: ['id'],
                        onDelete: 'RESTRICT'
                    },
                    {
                        columnNames: ['dpto_academic_id'],
                        referencedTableName: 'departments_academics',
                        referencedColumnNames: ['id'],
                        onDelete: 'RESTRICT'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('subjects')
    }

}
