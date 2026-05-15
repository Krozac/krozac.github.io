export default function ls({ ctx }) {
    const { routes } = ctx;

    if (!routes) return "No routes available";

    return Object.entries(routes)
        .map(([name, path]) => `- ${name}`)
        .join("\n");
}