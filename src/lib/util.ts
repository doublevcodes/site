export function slugFromPath(path: string): string | null {
    return path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;
}