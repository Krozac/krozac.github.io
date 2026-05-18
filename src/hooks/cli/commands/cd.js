export default function cd({argc, argv, flags, ctx}) {

    const { navigate, routes } = ctx;

    const key = argv[0]?.toLowerCase();

    if (flags.includes("--help")) {
        return "Usage: cd <route> [-n|--newtab]";
    }

    if (!key) {
        return "Usage: cd <route> [--newtab|-n]";
    }

    const route = routes[key]; // case-insensitive matching

    if (!route) {
        return `Unknown path: ${key}.`;
    }

    const openInNewTab = flags.includes("--newtab") || flags.includes("-n");

    if (route.type === "external"){
        const url = route.url
        
        if (openInNewTab) {
            window.open(url, "_blank");
        } else {
            window.location.href = url;
        }

        return `Opening ${key}...`;
    }

    if (route.type === "internal") {
        if (openInNewTab) {
            window.open("#" + route.path, "_blank");
            return `Opened ${key} in new tab`;
        }

        navigate(route.path);
        return `Navigated to ${key}`;
    }
    
    return "Invalid route type";
}

