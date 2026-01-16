import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TeacherGroups1768518012692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'teacher_groups',
                columns: [
                     {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'teacher_id',
                        type: 'int',
                        isNullable: false

                    },
                    {
                        name: 'group_id',
                        type: 'int',
                        isNullable: false

                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['teacher_id'],
                        referencedTableName: 'teachers',
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
        queryRunner.dropTable('teacher_groups')
    }

}
