
class CLIEngine {
    constructor() {
        this.commands = {};
        this.ctx = {};
    }

    setContext(ctx) {
        this.ctx = {
            ...this.ctx,
            ...ctx,
        };
        console.log("CLI context updated:", this.ctx);
    }

    registerCommand(name, func) {
        this.commands[name] = func;
    }

    async execute(line) {
        const [name, ...rawArgs] = line.trim().split(" ");

        const cmd = this.commands[name];

        if (!cmd) return `Command not found: ${name}`;

        const { flags, positionals } = this.parseArgs(rawArgs);

        try {
            return await cmd({
                argc: rawArgs.length,
                argv: positionals,
                flags,
                ctx: this.ctx,
            });
        } catch (err) {
            return `Error executing ${name}: ${err.message}`;
        }
    }

    parseArgs(args) {
        return {
            flags: args.filter(a => a.startsWith("-")),
            positionals: args.filter(a => !a.startsWith("-")),
        }
    }
}

export const cli = new CLIEngine(); // singleton instance of CLIEngine to be used across the app