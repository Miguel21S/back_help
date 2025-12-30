import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Teachers1766926029074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "teachers",
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'category',
                            type: 'varchar',
                            length: '100',
                            isNullable: false,
                        },
                        {
                            name: 'specialty',
                            type: 'varchar',
                            length: '100',
                            isNullable: false,
                        },
                        {
                            name: "created_date",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            isNullable: false
                        },
                        {
                            name: 'user_id',
                            type: 'int',
                            isNullable: false,
                        },
                      /*   {
                            name: 'faculty_id',
                            type: 'int',
                            isNullable: false,
                        }, */
                        {
                            name: 'department_id',
                            type: 'int',
                            isNullable: false,
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ['user_id'],
                            referencedTableName: 'users',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE',
                        },
                       /*  {
                            columnNames: ['faculty_id'],
                            referencedTableName: 'faculties',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE',
                        }, */
                        {
                            columnNames: ['department_id'],
                            referencedTableName: 'departments',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE',
                        }
                    ],
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("teachers");
    }

}
