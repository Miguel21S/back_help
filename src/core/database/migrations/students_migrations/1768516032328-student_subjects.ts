import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StudentSubjects1768516032328 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'student_subjects',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'student_id',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'subject_id',
                        type: 'int',
                        isPrimary: true
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
                        columnNames: ['subject_id'],
                        referencedTableName: 'subjects',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('student_subjects')
    }

}
