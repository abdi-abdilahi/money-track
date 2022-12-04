exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Incomes').del()
  await knex('Incomes').insert([
    {
      id: 1,
      name: 'Software Developer',
      amount: 1000,
      start_date: new Date('2022-11-26T23:59:59'),
      end_date: null,
      budget_id: 1,
    },
    {
      id: 2,
      name: 'Freelance',
      amount: 500,
      start_date: new Date('2022-11-26T23:59:59'),
      end_date: null,
      budget_id: 1,
    },
    {
      id: 3,
      name: 'Uber',
      amount: 400,
      start_date: new Date('2022-11-26T23:59:59'),
      end_date: null,
      budget_id: 1,
    },
  ])
}
