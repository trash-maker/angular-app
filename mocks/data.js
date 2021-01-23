var tasks = require("./data/tasks.js");

module.exports = () => {
  const data = {
    ...tasks(),
  };
  return data;
};
