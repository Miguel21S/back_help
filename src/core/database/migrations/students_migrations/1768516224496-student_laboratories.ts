import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StudentLaboratories1768516224496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table(
                {
                    name: 'student_laboratories',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment'
                        },
                        {
                            name: 'practice_date',
                            type: 'date',
                            isNullable: false
                        },
                        {
                            name: 'attended', ///  Asistencia del estudiante
                            type: 'boolean',
                            default: false,
                            isNullable: true
                        },
                        {
                            name: 'student_id',
                            type: 'int',
                            isNullable: false
                        },
                        {
                            name: 'laboratory_id ',
                            type: 'int',
                            isNullable: false
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ['student_id'],
                            referencedTableName: 'students',
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
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('student_laboratories')
    }

}
