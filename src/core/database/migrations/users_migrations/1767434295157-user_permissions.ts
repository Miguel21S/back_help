import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserPermissions1767434295157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_permissions",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_id",
                        type: "int"
                    },
                    {
                        name: "permission_id",
                        type: "int"
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users"
                    },
                    {
                        columnNames: ["permission_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "permission"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_permissions");
    }
}
