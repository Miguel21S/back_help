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
                            name: "created_date",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            isNullable: false
                        },
                        {
                            name: "user_id",
                            type: "int",
                            isNullable: false
                        },
                        {
                            name: 'faculty_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'dpto_academic_id',
                            type: 'int',
                            isNullable: false,
                        }
                    ],
                    uniques: [
                        {
                            name: "UQ_employee_unique_role",
                            columnNames: ['user_id', 'faculty_id', 'dept_academic_id', 'category']
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ["user_id"],
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            onDelete: "CASCADE"
                        },
                        {
                            columnNames: ['faculty_id'],
                            referencedTableName: 'faculties',
                            referencedColumnNames: ['id'],
                            onDelete: 'RESTRICT',
                        },
                        {
                            columnNames: ['dpto_academic_id'],
                            referencedTableName: 'departments_academics',
                            referencedColumnNames: ['id'],
                            onDelete: 'RESTRICT',
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
