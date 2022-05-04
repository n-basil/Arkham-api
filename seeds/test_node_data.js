/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


 export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('nodes').del()
  await knex('nodes').insert([
    { id: "1", name: "Bruh", color: "red", symbolType: "diamond", notes: "this is a test note"}, 
    { id: "2", name: "Babe", notes: "this is the test note for the Babe node"}, 
    { id: "3", name: "Dude", notes: "this is the note for the Dude node" }
  ]);


  await knex('links').del()
  await knex('links').insert([
    { source: "1", target: "2", color: "red", strokeWidth: "1.6", type: "CURVE_SMOOTH", notes: "this is the link between Bruh and Babe"},
    { source: "1", target: "3", strokeWidth: "3", notes: "This is the link between Bruh and Dude" }
  ]);

}
