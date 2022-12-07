exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Transactions').del()
  await knex('Transactions').insert([
    {
      id: 1,
      name: 'PakNSave',
      amount: 1110,
      date_created: '2022-11-12',
      expenses_id: 3,
    },
    {
      id: 2,
      name: 'Countdown',
      amount: 1110,
      date_created: '2022-11-25',
      expenses_id: 3,
    },
    {
      id: 3,
      name: 'Z Energy',
      amount: 500,
      date_created: '2022-11-20',
      expenses_id: 1,
    },
    {
      id: 4,
      name: 'Anytime Fitness',
      amount: 1500,
      date_created: '2022-11-29',
      expenses_id: 2,
    },
    {
      id: 5,
      name: 'Anytime Fitness',
      amount: 4000,
      date_created: '2022-01-29',
      expenses_id: 2,
    },
    {
      id: 6,
      name: 'PakNSave',
      amount: 5402,
      date_created: '2022-02-12',
      expenses_id: 3,
    },
    {
      id: 7,
      name: 'Z Energy',
      amount: 6650,
      date_created: '2022-03-20',
      expenses_id: 1,
    },
    {
      id: 8,
      name: 'Countdown',
      amount: 2510,
      date_created: '2022-04-25',
      expenses_id: 3,
    },
    {
      id: 9,
      name: 'Southern Cross',
      amount: 3510,
      date_created: '2022-05-25',
      expenses_id: 4,
    },
    {
      id: 10,
      name: 'AA',
      amount: 4010,
      date_created: '2022-06-25',
      expenses_id: 6,
    },
    {
      id: 11,
      name: 'AA',
      amount: 4010,
      date_created: '2022-06-25',
      expenses_id: 6,
    },
    {
      id: 12,
      name: 'Farmers NZ',
      amount: 4010,
      date_created: '2022-07-25',
      expenses_id: 7,
    },
    {
      id: 13,
      name: 'Southern Cross',
      amount: 3510,
      date_created: '2022-08-25',
      expenses_id: 4,
    },
    {
      id: 14,
      name: 'Countdown',
      amount: 6510,
      date_created: '2022-09-25',
      expenses_id: 3,
    },
    {
      id: 15,
      name: 'Z Energy',
      amount: 5650,
      date_created: '2022-10-20',
      expenses_id: 1,
    },
    {
      id: 16,
      name: 'Countdown',
      amount: 50,
      date_created: '2022-12-05',
      expenses_id: 3,
    },
  ])
}
