exports.up = function (knex) {
  return knex.schema.createTable('Savings', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('amount')
    table.date('goal_date')
    table.integer('budget_id').references('Budget.id').onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('Savings')
}
