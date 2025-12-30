import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Departments1766925969807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "departments",
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
                    foreignKeys: [
                        {
                            columnNames: ['faculty_id'],
                            referencedTableName: 'faculties',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE'
                        },
                        {
                            columnNames: ['institution_id'],
                            referencedTableName: 'institutions',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE'
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
        await queryRunner.dropTable("departments");
    }

}
