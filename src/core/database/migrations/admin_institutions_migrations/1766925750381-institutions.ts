import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Institutions1766925750381 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "institutions",
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
                            length: '255',
                            isNullable: false,
                        },
                        {
                            name: 'description',
                            type: 'varchar',
                            length: '500',
                            isNullable: true,
                        },
                        {
                            name: 'type',
                            type: 'varchar',
                            length: '100',
                            isNullable: false,
                        },
                        {
                            name: 'address',
                            type: 'varchar',
                            length: '500',
                            isNullable: true,
                        },
                        {
                            name: 'country',
                            type: 'varchar',
                            length: '100',
                            isNullable: true,
                        },
                        {
                            name: 'province',
                            type: 'varchar',
                            length: '100',
                            isNullable: true,
                        },
                        {
                            name: 'city',
                            type: 'varchar',
                            length: '100',
                            isNullable: true,
                        },
                        {
                            name: 'postal_code',
                            type: 'varchar',
                            length: '100',
                            isNullable: true,
                        },
                        {
                            name: 'phone',
                            type: 'varchar',
                            length: '50',
                            isNullable: true,
                        },
                        {
                            name: 'email',
                            type: 'varchar',
                            length: '100',
                            isNullable: false,
                        },
                        {
                            name: 'website',
                            type: 'varchar',
                            length: '255',
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
                    ],
                    uniques: [{
                        name: "UQ_institution_address",
                        columnNames: ["name", "country", "city", "email"]
                    }]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("institutions");
    }

}
