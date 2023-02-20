const { faker } = require("@faker-js/faker");

module.exports = async function (Article) {
  const articles = [];
  for (let i = 0; i < 40; i++) {
    articles.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      userId: faker.random.numeric(1, 40),
      image: faker.image.avatar(),
    });
  }

  await Article.bulkCreate(articles);
};
