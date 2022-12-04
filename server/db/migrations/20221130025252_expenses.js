exports.up = function (knex) {
  return knex.schema.createTable('Expenses', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('amount')
    table.integer('budget_id').references('Budget.id').onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('Expenses')
}
