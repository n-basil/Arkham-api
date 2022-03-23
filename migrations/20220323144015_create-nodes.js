// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function(knex) {
//     return knex.schema.createTable('nodes', (table) => {
//         // id
//         table.string('id').notNullable();
//         // title
//         table.string('key').notNullable();
//         table.string('value').notNullable();

//         table.string('workspace_id').references('id').inTable('workspace').notNullable().onDelete('cascade');
//       });
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = function(knex) {
//     return knex.schema.dropTableIfExists('nodes');
// };


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
