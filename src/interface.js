import readline from "readline";
import { prettyPath } from "./util";

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
        console.log(`${index + 1}. ${prettyPath(binding)}`);
      });
    } else {
      console.log("[N/A]");
      setTimeout(() => process.exit(0), 3000);
    }
  });
};

export default getUserChoice;
