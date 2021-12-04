<script lang="ts">
    import { page } from "$app/stores";
    import cn from "classnames";

    export let href: string;
    export let text: string;

    $: isActive = $page.path === href;
</script>

<a {href} class={
    cn(isActive ? 'font-semibold text-gray-800 dark:text-gray-200' : 'font-normal text-gray-600 dark:text-gray-400',
    'hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all')
}>
    <span>{text}</span>
</a>