import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserCases1763990124055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_cases",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    // {
                    //     name: "user_name",
                    //     type: "varchar",
                    //     length: "50",
                    //     isNullable: false
                    // },
                    {
                        name: "case_name",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    // {
                    //     name: "user_id",
                    //     type: "int",
                    //     isNullable: false
                    // },
                    {
                        name: "case_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "role_name",
                        type: "varchar",
                        length: "50",
                        isNullable: false
                    },
                    {
                        name: "created_date",
                        type: "date",
                        isNullable: false
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["case_id"],
                        referencedTableName: "cases",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                    // {
                    //     columnNames: ["user_id"],
                    //     referencedTableName: "users",
                    //     referencedColumnNames: ["id"],
                    //     onDelete: "CASCADE"
                    // }
                ],
                uniques: [
                    {
                        columnNames: ["user_id", /* "case_id" */]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_cases")
    }

}
