import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Courses1768497803067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: 'courses',
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
                            name: 'academic_year',
                            type: 'varchar',
                            length: '9',
                            isNullable: false
                        },
                        {
                            name: 'semester',
                            type: 'varchar',
                            length: '50',
                            isNullable: false
                        },
                        {
                            name: 'state',
                            type: 'varchar',
                            length: '20',
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
                        {
                            name: "subject_id",
                            type: "int",
                            isNullable: false
                        },
                    ],
                    uniques: [
                        {
                            name: 'UQ_course_subject_year_semester',
                            columnNames: ['subject_id', 'semester']
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
        await queryRunner.dropTable('courses')
    }

}
