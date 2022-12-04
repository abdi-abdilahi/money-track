exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Transactions').del()
  await knex('Transactions').insert([
    {
      id: 1,
      name: 'PakNSave',
      amount: 110,
      date_created: new Date('2022-11-25T23:59:59'),
      expenses_id: 3,
    },
    {
      id: 2,
      name: 'Countdown',
      amount: 110,
      date_created: new Date('2022-11-25T23:59:59'),
      expenses_id: 3,
    },
    {
      id: 3,
      name: 'Z Energy',
      amount: 50,
      date_created: new Date('2022-11-20T23:59:59'),
      expenses_id: 1,
    },
    {
      id: 4,
      name: 'Anytime Fitness',
      amount: 15,
      date_created: new Date('2022-11-29T23:59:59'),
      expenses_id: 2,
    },
  ])
}
