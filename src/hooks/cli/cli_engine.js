
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

    registerCommand(name, command) {
        this.commands[name] = command;
    }

    async execute(line) {
        const [name, ...rawArgs] = line.trim().split(" ");

        const cmd = this.commands[name];

        if (!cmd) return `Command not found: ${name} use : help`;

        const { flags, positionals } = this.parseArgs(rawArgs);

        try {
            return await cmd.execute({
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

    getCommandNames(){
        return Object.keys(this.commands);
    }
}

export const cli = new CLIEngine(); // singleton instance of CLIEngine to be used across the app