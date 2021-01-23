const { addDays, startOfDay, endOfDay } = require("date-fns");
var faker = require("faker");

module.exports = () => {
  const data = { tasks: [] };
  // Create 10 tasks
  let refDate = faker.date.recent(3);
  for (let i = 0; i < 10; i++) {
    const start = addDays(refDate, faker.random.number(3));
    const end = addDays(start, faker.random.number(10));
    data.tasks.push({
      id: i,
      summary: faker.git.commitMessage(),
      author: faker.name.findName(),
      status: `status-${i}`,
      start: startOfDay(start),
      end: endOfDay(end),
    });
    refDate = end;
  }
  return data;
};
