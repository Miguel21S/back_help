import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Students1768495243875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'students',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'date_admission',
                        type: 'timestamp',
                        default: "CURRENT_TIMESTAMP",
                        isNullable: false,

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
                        name: 'user_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'program_id',
                        type: 'int',
                        isNullable: false
                    },
                ],
                uniques: [
                    {
                        name: 'UQ_student_user',
                        columnNames: ['user_id']
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'RESTRICT'
                    },
                    {
                        columnNames: ['program_id'],
                        referencedTableName: 'programs',
                        referencedColumnNames: ['id'],
                        onDelete: 'RESTRICT'
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('students')
    }

}
