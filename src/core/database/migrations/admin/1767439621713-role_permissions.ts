import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RolePermissions1767439621713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "role_permissions",
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'role_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'permission_id',
                            type: 'int',
                            isNullable: false,
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
                            columnNames: ['permission_id'],
                            referencedTableName: 'permission',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE'
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("role_permissions")
    }
}
