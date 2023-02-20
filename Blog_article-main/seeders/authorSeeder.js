const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

module.exports = async function (Author) {
  const authors = [];
  for (let i = 0; i < 40; i++) {
    authors.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: await bcrypt.hash("1234", 8),
    });
  }

  await Author.bulkCreate(authors);
};
