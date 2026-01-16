import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class StudentGroups1768517870958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'student_groups',
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
                        name: 'group_id',
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
                        columnNames: ['group_id'],
                        referencedTableName: 'groups',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('student_groups')
    }

}
