import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1762634123551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "users",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment"
                        },
                        {
                            name: "name",
                            type: "varchar",
                            length: "255",
                            isNullable: false
                        },
                        {
                            name: "lastName",
                            type: "varchar",
                            length: "255",
                            isNullable: false
                        },
                        {
                            name: "date_born",
                            type: "date",
                            isNullable: true,
                        },
                        {
                            name: "nationality",
                            type: "varchar",
                            length: "100",
                            isNullable: true
                        },
                        {
                            name: "gender",
                            type: "varchar",
                            length: "50",
                            isNullable: false
                        },
                        {
                            name: "phone",
                            type: "varchar",
                            length: "50",
                            isNullable: true
                        },
                        {
                            name: "email",
                            type: "varchar",
                            length: "255",
                            isUnique: true,
                            isNullable: false
                        },
                        {
                            name: "special_situation",
                            type: "varchar",
                            length: "255",
                            isNullable: true
                        },
                        {
                            name: "date_entry_apartment",
                            type: "date",
                            isNullable: true
                        },
                        {
                            name: "created_date",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            isNullable: false
                        },
                        {
                            name: "password",
                            type: "varchar",
                            length: "255",
                            isNullable: false
                        },
                        {
                            name: 'building_id',
                            type: 'int',
                            isNullable: true
                        },
                        {
                            name: "role_id",
                            type: "int",
                            isNullable: false
                        },

                    ],
                    foreignKeys: [
                        {
                            columnNames: ["role_id"],
                            referencedTableName: "roles",
                            referencedColumnNames: ["id"],
                            onDelete: "CASCADE"
                        },
                        {
                            columnNames: ["building_id"],
                            referencedTableName: "buildings",
                            referencedColumnNames: ["id"],
                            onDelete: "CASCADE"
                        }
                    ]
                }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
