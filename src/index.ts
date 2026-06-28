import { startCLI } from "./chat/cli.js";

startCLI().catch((error: Error) => {
    console.error("Error fatal:", error.message);
    process.exit(1);
});
