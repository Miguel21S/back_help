import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Zones1763988535263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "zones",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment"
                        },
                        {
                            name: "country",
                            type: "varchar",
                            length: "50",
                            isNullable: false,
                        },
                        {
                           name: "state_or_province",
                            type: "varchar",
                            length: "50",
                            isNullable: false,  
                        },
                        {
                             name: "city",
                            type: "varchar",
                            length: "50",
                            isNullable: false,
                        },
                        {
                            name: "sector_or_neighborhood",
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
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("zones")
    }

}
