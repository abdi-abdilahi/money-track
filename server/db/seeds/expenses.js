exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Expenses').del()
  await knex('Expenses').insert([
    { id: 1, name: 'Petrol', amount: 50, budget_id: 1 },
    { id: 2, name: 'Fitness', amount: 15, budget_id: 1 },
    { id: 3, name: 'Groceries', amount: 175, budget_id: 1 },
    { id: 4, name: 'Health Insurance', amount: 50, budget_id: 1 },
    { id: 5, name: 'Car Insurance', amount: 20, budget_id: 1 },
    { id: 6, name: 'Car Maintenance', amount: 50, budget_id: 1 },
    { id: 7, name: 'Shopping', amount: 25, budget_id: 1 },
    { id: 8, name: 'Food/Dining Out', amount: 25, budget_id: 1 },
  ])
}
