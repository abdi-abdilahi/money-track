exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Budget').del()
  await knex('Budget').insert([
    {
      id: 1,
      user_id: 'auth0|638fd84aa4fbecebe840c646',
      name: 'Personal',
      start_date: '2022-12-04',
      end_date: '2022-12-10',
    },
  ])
}
