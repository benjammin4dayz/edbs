import path from "path";
import {
  getConfigPath,
  getActiveBindsPath,
  getStoredBindsPaths,
} from "./ed.conf";
import getUserChoice from "./interface";
import { prettyPath, swapBindings } from "./util";

const main = async () => {
  const activeBinds = getActiveBindsPath(getConfigPath());
  const storedBinds = getStoredBindsPaths(
    path.join(path.dirname(process.argv[0]), "bindings")
  );

  const startDialog = () => {
    getUserChoice(storedBinds).then((choice) => {
      const didSwap = swapBindings(activeBinds, choice);

      if (didSwap) {
        console.log(`[EDBS]: SWAPPING TO -> ${prettyPath(choice)}`);

        setTimeout(() => process.exit(0), 1500);
      } else {
        startDialog();
      }
    });
  };

  startDialog();
};

main();
