exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Budget').del()
  await knex('Budget').insert([
    { id: 1, user_id: '2', start_date: new Date(Date.now()), duration: null },
  ])
}
