import { cli } from './cli_engine';
import cdCommand from './commands/cd' ;
import lsCommand from './commands/ls' ;

export function registerCommands() {
    cli.registerCommand("cd",cdCommand);
    cli.registerCommand("ls",lsCommand);
    // later maybe add more commands here or allow dynamic registration of commands by other components
}
