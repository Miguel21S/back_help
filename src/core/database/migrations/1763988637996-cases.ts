import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Cases1763988637996 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "cases",
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
                            length: "50",
                            isNullable: false
                        },
                        {
                            name: "created_by_user_name",
                            type: "varchar",
                            length: "50",
                            isNullable: false
                        },
                        {
                            name: "created_by_user_id",
                            type: "int",
                            isNullable: false
                        },
                        {
                            name: "status",
                            type: "varchar",
                            length: "50",
                            isNullable: false
                        },
                        {
                            name: "created_date",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            isNullable: false
                        },
                        {
                            name: "zone_name",
                            type: "varchar",
                            length: "50",
                            isNullable: false,
                        },
                        {
                            name: "zone_id",
                            type: "int",
                            isNullable: false
                        }
                        
                    ],
                    foreignKeys: [
                        {
                            columnNames: ["zone_id"],
                            referencedTableName: "zones",
                            referencedColumnNames: ["id"],
                            onDelete: "CASCADE"
                        }
                    ],
                    uniques: [
                        {
                            name: "UQ_case_zone",
                            columnNames: ["name", "zone_id"]
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cases");
    }

}
