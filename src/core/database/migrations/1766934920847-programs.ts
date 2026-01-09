import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Programs1766934920847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                /*  programs -> corsos -> assignatures */
                name: "programs",
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
                        name: 'degree',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'duration',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'total_credits',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'modality',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                    },
                    {
                        name: 'coordinator',
                        type: 'varchar',
                        length: '100',
                        isNullable: true,
                    },
                    {
                        name: "state",
                        type: "enum",
                        enum: ['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUPENDED'],
                        default:  "'ACTIVE'",
                        isNullable: false
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
                ],
                uniques: [{
                    columnNames: ["name", "degree", "faculty_id"]
                }],
                foreignKeys: [
                    {
                        columnNames: ['faculty_id'],
                        referencedTableName: 'faculties',
                        referencedColumnNames: ['id'],
                        onDelete: 'RESTRICT'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("programs");
    }

}
