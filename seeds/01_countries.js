const Countries = require('./Countries_FIXED.json')['Sheet1'];

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  //let valor = await JSON.stringify(Countries)
  //console.log(valor)
  return knex('Countries').del()
    .then(function () {
      // Inserts seed entries
      return knex('Countries').insert(Countries);
    });
};
