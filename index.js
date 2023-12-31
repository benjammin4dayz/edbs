// Node modules must be cjs or they won't resolve in pkg executables
const os = require("os");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Get a platform-specific path to Elite Dangerous' config folder
const getConfigPath = () => {
  const ED_CONF_PATH = path.join(
    "Frontier Developments",
    "Elite Dangerous",
    "Options",
    "Bindings"
  );

  const bindingsPath = {
    linux: path.join(os.homedir(), ".local", "share", ED_CONF_PATH),
    win32: path.join(os.homedir(), "AppData", "Local", ED_CONF_PATH),
  };

  return bindingsPath[os.platform()];
};

const getActiveBindingsPath = (configPath) => {
  const targetPath = path.join(configPath, "Custom.4.0.binds");
  const isFileAvailable = fs.existsSync(targetPath);

  if (!isFileAvailable) {
    try {
      fs.writeFileSync(targetPath, "");
    } catch {
      throw new Error(`[EDBS]: Cannot create custom bindings! ${targetPath}`);
    }
  }

  return targetPath;
};

const getStoredBindingsPaths = (configPath) => {
  const paths = [];

  for (const file of fs.readdirSync(configPath)) {
    file.endsWith(".edbs") && paths.push(path.join(configPath, file));
  }

  return paths;
};

const getPrettyPath = (basePath) => {
  return basePath.split(path.sep).pop().replace(".edbs", "");
};

const getUserChoice = (storedBindings) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.write("Elite Dangerous Binding Switcher\n\n");

  return new Promise((resolve) => {
    rl.question("Select a binding:\n", (choice) => {
      rl.close();
      // Be careful with "off by one" errors
      const idx = parseInt(choice, 10) - 1;
      resolve(storedBindings[idx]);
    });

    rl.on("SIGINT", () => {
      process.exit(0);
    });

    if (storedBindings.length) {
      storedBindings.forEach((binding, index) => {
        console.log(`${index + 1}. ${getPrettyPath(binding)}`);
      });
    } else {
      console.error("[N/A]");
      setTimeout(() => process.exit(0), 3000);
    }
  });
};

const swapBindings = (oldPath, newPath) => {
  try {
    fs.copyFileSync(newPath, oldPath);
    return true;
  } catch (error) {
    console.error(`[EDBS]: Error swapping bindings -> ${error.message}`);
  }
};

const main = async () => {
  const activeBindings = getActiveBindingsPath(getConfigPath());
  const storedBindings = getStoredBindingsPaths(
    path.join(process.cwd(), "bindings")
  );

  const promptUntilValid = () => {
    getUserChoice(storedBindings).then((choice) => {
      const canSwap = swapBindings(activeBindings, choice);

      if (canSwap) {
        console.log(`[EDBS]: SWAPPING TO -> ${getPrettyPath(choice)}`);

        setTimeout(() => process.exit(0), 1500);
      } else {
        promptUntilValid();
      }
    });
  };

  promptUntilValid();
};

main();
