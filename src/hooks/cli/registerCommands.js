import { cli } from './cli_engine';
import cdCommand from './commands/cd' ;
import lsCommand from './commands/ls' ;
import clearCommand from './commands/clear';
import helpCommand from './commands/help';
import themeCommand from './commands/theme'

export function registerCommands() {
    cli.registerCommand("cd",{
            execute: cdCommand,
            description: "Navigate to a route or external link",
            usage: "cd <route> [-n|--newtab]"
        });
    cli.registerCommand("ls",{
        execute: lsCommand,
        description: "List available routes",
        usage: "ls"
    });
    cli.registerCommand("clear",{
        execute: clearCommand,
        description: "Clear the terminal output",
        usage: "clear"
    });
    cli.registerCommand("help",{
        execute: helpCommand,
        description: "Display available commands",
        usage: "help [command]"
    });
    cli.registerCommand("theme",{
        execute: themeCommand,
        description: "Changes website theme to light/dark",
        usage: "theme <light|dark>"
    })


}
