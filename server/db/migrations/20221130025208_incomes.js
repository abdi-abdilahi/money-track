exports.up = function (knex) {
  return knex.schema.createTable('Incomes', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('amount')
    table.date('start_date')
    table.date('end_date')
    table.integer('budget_id').references('Budget.id').onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('Incomes')
}
