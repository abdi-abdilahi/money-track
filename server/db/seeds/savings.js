exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Savings').del()
  await knex('Savings').insert([
    {
      id: 1,
      name: 'MacBook',
      amount: 2000,
      goal_date: new Date('2023-07-26T23:59:59'),
      budget_id: 1,
    },
    {
      id: 2,
      name: 'Travel',
      amount: 8000,
      goal_date: new Date('2023-09-26T23:59:59'),
      budget_id: 1,
    },
    {
      id: 3,
      name: 'Wedding',
      amount: 50000,
      goal_date: new Date('2025-02-06T23:59:59'),
      budget_id: 1,
    },
  ])
}
