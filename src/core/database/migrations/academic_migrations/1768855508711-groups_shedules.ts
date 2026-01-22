import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class GroupsShedules1768855508711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'groups_shedules',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment'
                        },
                        {
                            name: 'day_of_week',
                            type: 'smallint',
                            isNullable: true
                        },
                        {
                            name: 'start_time',
                            type: 'time',
                            isNullable: true
                        },
                        {
                            name: 'end_time',
                            type: 'time',
                            isNullable: true
                        },
                        {
                            name: 'group_id',
                            type: 'int',
                            isNullable: false
                        },
                        {
                            name: 'classroom_id',
                            type: 'int',
                            isNullable: false
                        },

                    ],
                    uniques: [
                        {
                            name: 'UQ_group_schedule_time',
                            columnNames: ['group_id', 'day_of_week', 'start_time', 'end_time']
                        }
                    ],
                    foreignKeys: [
                        {
                            columnNames: ['group_id'],
                            referencedTableName: 'groups',
                            referencedColumnNames: ['id'],
                            onDelete: 'CASCADE'
                        },
                        {
                            columnNames: ['classroom_id'],
                            referencedTableName: 'classrooms',
                            referencedColumnNames: ['id'],
                            onDelete: 'RESTRICT'
                        },
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('groups_shedules')
    }

}
