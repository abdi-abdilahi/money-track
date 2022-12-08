exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Incomes').del()
  await knex('Incomes').insert([
    {
      id: 1,
      name: 'Software Developer',
      amount: 1200,
      start_date: '2022-11-26',
      end_date: null,
      budget_id: 1,
    },
  ])
}
