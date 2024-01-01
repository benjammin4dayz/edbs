import fs from "fs";
import path from "path";

const prettyPath = (basePath) => {
  return basePath.split(path.sep).pop().replace(".binds", "");
};

const shutdown = ({ msg, time, err }) => {
  msg && console.log(msg);

  return new Promise((resolve) => {
    console.log(`This process will exit in ${time / 1000} seconds...`);
    setTimeout(() => resolve(process.exit(err ? 1 : 0)), time);
  });
};

const swapBindings = (oldPath, newPath) => {
  try {
    fs.copyFileSync(newPath, oldPath);
    return true;
  } catch (e) {
    switch (e.code) {
      case "ERR_INVALID_ARG_TYPE":
        return console.error(
          "Please enter a valid number corresponding to a binding."
        );
      default:
        shutdown({
          msg: `An error occured while trying to swap bindings: \n ${e}`,
          time: 2000,
          err: true,
        });
    }
  }
};

export { prettyPath, shutdown, swapBindings };
