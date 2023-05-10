const { faker } = require("@faker-js/faker");

module.exports = async function (User) {

  const users = [];
  const roleNames = ["reader", "writer", "editor", "admin",]
  const roleCodes = [100, 200, 300, 400];

  for (let i = 0; i < 40; i++) {
    const randomNumber = faker.datatype.number({min: 0, max: 3});
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: "1234",
      roleName: roleNames[randomNumber],
      roleCode: roleCodes[randomNumber],
    });
  }
  await User.bulkCreate(users);
};
