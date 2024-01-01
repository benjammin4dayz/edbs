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

export { prettyPath, shutdown };
