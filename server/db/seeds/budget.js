exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Budget').del()
  await knex('Budget').insert([
    {
      id: 1,
      user_id: 'auth0|638fd84aa4fbecebe840c646',
      name: 'Personal',
      start_date: new Date('2022-12-04T00:00:01'),
      end_date: new Date('2022-12-10T00:00:01'),
    },
  ])
}
