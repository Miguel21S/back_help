import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Employees1766926301953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "employees",
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
                            name: "created_date",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            isNullable: false
                        },
                        {
                            name: 'faculty_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'department_id',
                            type: 'int',
                            isNullable: false,
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ['faculty_id'],
                            referencedTableName: 'faculties',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE',
                        },
                        {
                            columnNames: ['department_id'],
                            referencedTableName: 'departments',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE',
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employees");
    }

}
