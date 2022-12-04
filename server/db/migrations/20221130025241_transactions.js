exports.up = function (knex) {
  return knex.schema.createTable('Transactions', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('amount')
    table.date('date_created')
    table.integer('expenses_id ').references('Expenses.id').onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('Transactions')
}
