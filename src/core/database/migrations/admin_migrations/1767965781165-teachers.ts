import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Teachers1767965781165 implements MigrationInterface {

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
                            name: 'dept_academic_id',
                            type: 'int',
                            isNullable: false,
                        }
                    ],
                    uniques: [{
                        columnNames: ["user_id"]
                    }],
                    foreignKeys: [
                        {
                            columnNames: ['user_id'],
                            referencedTableName: 'users',
                            referencedColumnNames: ['id'],
                            onDelete: 'RESTRICT',
                        },
                        /*  {
                             columnNames: ['faculty_id'],
                             referencedTableName: 'faculties',
                             referencedColumnNames: ['id'],
                             onDelete: 'RESTRICT',
                         }, */
                        {
                            columnNames: ['dept_academic_id'],
                            referencedTableName: 'departments_academics',
                            referencedColumnNames: ['id'],
                            onDelete: 'RESTRICT',
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
