/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up (knex){
    return knex.schema.createTable('nodes', (table) => {
        // id
        table.string('id').notNullable();
        // title
        table.string('name').notNullable();
        table.string('size')
        table.string('color')
        table.string('symbolType')
        table.string('notes')

        // // creation & update
        // table.timestamps(true, true);
      });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex){
    return knex.schema.dropTableIfExists('nodes');
}
