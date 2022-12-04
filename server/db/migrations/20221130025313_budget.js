exports.up = function (knex) {
  return knex.schema.createTable('Budget', (table) => {
    table.increments('id').primary()
    table.string('user_id')
    table.date('start_date')
    table.bigInteger('duration')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('Budget')
}
