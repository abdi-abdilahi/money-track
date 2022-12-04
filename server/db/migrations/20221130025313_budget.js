exports.up = function (knex) {
  return knex.schema.createTable('Budget', (table) => {
    table.increments('id').primary()
    table.string('user_id')
    table.date('start_date')
    table.date('end_date')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('Budget')
}
