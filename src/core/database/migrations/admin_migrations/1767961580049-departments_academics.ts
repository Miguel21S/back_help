import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class DepartmentsAcademics1767961580049 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "departments_academics",
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'name',
                            type: 'varchar',
                            length: '100',
                            isNullable: false,
                        },
                        {
                            name: 'description',
                            type: 'varchar',
                            length: '500',
                            isNullable: true,
                        },
                        {
                            name: 'department_head',
                            type: 'varchar',
                            length: '100',
                            isNullable: true,
                        },
                        {
                            name: 'email',
                            type: 'varchar',
                            length: '100',
                            isNullable: true,
                        },
                        {
                            name: "isActive",
                            type: "boolean",
                            default: true
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
                            name: 'institution_id',
                            type: 'int',
                            isNullable: false,
                        },
                        // {
                        //     name: 'employee_id',
                        //     type: 'int',
                        //     isNullable: false,
                        // }
                    ],
                    uniques: [
                        {
                            name: "UQ_department_name_faculty",
                            columnNames: ["name", "faculty_id"]
                        },
                        {
                            name: "UQ_department_email",
                            columnNames: ["email"]
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
                            columnNames: ['institution_id'],
                            referencedTableName: 'institutions',
                            referencedColumnNames: ['id'],
                            onDelete: 'RESTRICT'
                        },
                        // {
                        //     columnNames: ['employee_id'],
                        //     referencedTableName: 'employees',
                        //     referencedColumnNames: ['id'],
                        //     onDelete: 'CASCADE'
                        // }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("departments_academics")
    }

}
