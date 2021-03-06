import { Logger } from "./logger.js";

function Promise1(name) {
  this.name = name;
}

Promise1.prototype.run = function(url) {
  const before = new Date().getTime();
  return Promise.resolve().then(() => {
    return new Promise(resolve => {
      const after = new Date().getTime();
      resolve(new Logger(this.name, before, after));
    });
  });
};

export { Promise1 };
