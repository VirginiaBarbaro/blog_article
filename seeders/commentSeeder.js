const { faker } = require("@faker-js/faker");

module.exports = async function (Comment) {
  const comments = [];
  for (let i = 0; i < 40; i++) {
    comments.push({
      content: faker.lorem.paragraph(), //paragraph en singular hace un solo parrafo
      userId: faker.random.numeric(1, 40),
      articleId: faker.random.numeric(1, 40),
    });
  }

  await Comment.bulkCreate(comments);
};