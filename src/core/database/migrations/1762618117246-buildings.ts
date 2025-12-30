import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Buildings1762618117246 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "buildings",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment"
                        },
                        {
                            name: "address_1",
                            type: "varchar",
                            length: "255",
                            isNullable: false

                        }, // Calle+Nº o formato del país
                        {
                            name: "address_2",
                            type: "varchar",
                            length: "255",
                            isNullable: true

                        },

                        // {
                        //     name: "address",
                        //     type: "varchar",
                        //     length: "255",
                        //     isNullable: false
                        // },
                        // {
                        //     name: "number_build",
                        //     type: "varchar",
                        //     length: "10",
                        //     isNullable: false
                        // },
                        {
                            name: "country",
                            type: "varchar",
                            length: "100",
                            isNullable: false
                        },
                        {
                            name: "province",
                            type: "varchar",
                            length: "50",
                            isNullable: false
                        },
                        {
                            name: "city",
                            type: "varchar",
                            length: "50",
                            isNullable: false
                        },
                        {
                            name: "postal_code",
                            type: "varchar",
                            length: "10",
                            isNullable: false
                        },
                        {
                            name: "build_type",
                            type: "varchar",
                            length: "50",
                            isNullable: false
                        },
                        {
                            name: "last_maintenance",
                            type: "date",
                            isNullable: true
                        },
                        /* {
                            name: "admin_responsible",
                            type: "varchar",
                            length: "255",
                            isNullable: true
                        }, */
                        {
                            name: "general_status",
                            type: "varchar",
                            length: "100",
                            isNullable: true
                        },
                        {
                            name: "services_available",
                            type: "varchar",
                            length: "255",
                            isNullable: true
                        },
                        /*{
                            name: "photo",
                            type: "varchar",
                            length: "500",
                            isNullable: true
                        }, */
                        {
                            name: "quantity_apartment",
                            type: "int",
                            isNullable: false
                        },
                        {
                            name: "floor_number",
                            type: "int",
                            length: "10",
                            isNullable: true
                        },
                        {
                            name: "created_date",
                            type: "timestamp",
                            default: "CURRENT_TIMESTAMP",
                            isNullable: false
                        },
                    ],
                    uniques: [
                        {
                            name: "unique_building",
                            columnNames: ["address_1", "postal_code", "city", "province"],
                        },
                    ],
                }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("buildings");
    }
}
