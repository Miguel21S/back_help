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
                            name: "type_document",
                            type: "varchar",
                            length: "30",
                            isNullable: true
                        },
                        {
                            name: "number_document",
                            type: "varchar",
                            length: "50",
                            isNullable: true
                        },
                      /*   {
                            name: "address",
                            type: "varchar",
                            length: "255",
                            isNullable: true
                        }, */
                        {
                            name: "avatar",
                            type: "varchar",
                            length: "500",
                            isNullable: true
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
                            name: "last_login",
                            type: "timestamp",
                            onUpdate: 'CURRENT_TIMESTAMP',
                            isNullable: true
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
                        /* {
                            name: "updated_at",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            onUpdate: "CURRENT_TIMESTAMP"
                        }, */
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

                    ],
                    foreignKeys: [
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
