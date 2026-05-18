export default function help({ argv, ctx }) {
    const { cli } = ctx;

    const commandName = argv[0];

    // Detailed help for one command
    if (commandName) {
        const cmd = cli.commands[commandName.toLowerCase()];

        if (!cmd) {
            return `Unknown command: ${commandName}`;
        }

        return `${commandName}

${cmd.description || "No description"}

Usage:
  ${cmd.usage || "No usage available"}`;
    }

    // General help
    return Object.entries(cli.commands)
        .map(([name, cmd]) =>
            `${name.padEnd(10)} ${cmd.description || "no description"}`
        )
        .join("\n");
}