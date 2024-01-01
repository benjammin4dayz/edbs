import fs from "fs";
import os from "os";
import path from "path";
import { shutdown } from "./util";

const getConfigPath = () => {
  const ED_CONF_PATH = path.join(
    "Frontier Developments",
    "Elite Dangerous",
    "Options",
    "Bindings"
  );

  const bindsPath = {
    linux: path.join(os.homedir(), ".local", "share", ED_CONF_PATH),
    win32: path.join(os.homedir(), "AppData", "Local", ED_CONF_PATH),
  };

  return bindsPath[os.platform()];
};

const getActiveBindsPath = (configPath) => {
  const targetPath = path.join(configPath, "Custom.4.0.binds");
  const pathExists = fs.existsSync(targetPath);

  if (!pathExists) {
    try {
      fs.mkdirSync(configPath, { recursive: true });
      console.log(`[WRITE](DIR): ${configPath}`);
    } catch {
      shutdown({
        msg: `Failed to create directory: ${targetPath}`,
        time: 2000,
        err: true,
      });
    }

    try {
      fs.writeFileSync(targetPath, "");
      console.log(`[WRITE](FILE): ${targetPath.split(path.sep).pop()}`);
    } catch {
      shutdown({
        msg: `Failed to write file: ${targetPath}`,
        time: 2000,
        err: true,
      });
    }
  }

  return targetPath;
};

const getStoredBindsPaths = (configPath) => {
  const paths = [];
  const pathExists = fs.existsSync(configPath);

  if (!pathExists) {
    try {
      fs.mkdirSync(configPath, { recursive: true });
    } catch {
      shutdown({
        msg: `Failed to create directory: ${configPath}`,
        time: 2000,
        err: true,
      });
    }
  }

  for (const file of fs.readdirSync(configPath)) {
    file.endsWith(".binds") && paths.push(path.join(configPath, file));
  }

  return paths;
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

export { getConfigPath, getActiveBindsPath, getStoredBindsPaths, swapBindings };
