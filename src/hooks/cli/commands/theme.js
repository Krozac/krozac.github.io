export default function theme({argc, argv, flags, ctx}){
    const { setTheme } = ctx;

    if (flags.includes("--help")){
        return "Usage: theme <light|dark>";
    }

    let theme = argv[0]
    if (!theme){
         return "Usage: theme <light|dark>";
    }

    
    return setTheme(theme.toLowerCase());
}