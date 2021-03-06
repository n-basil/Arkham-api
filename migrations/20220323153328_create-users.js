/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up (knex) {
    return knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.string("username").unique().notNullable();
      table.string("passwordHash").notNullable();
      table.timestamps(true, true);
    });
  };
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTableIfExists("users");
}