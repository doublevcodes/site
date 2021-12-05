<script lang="ts">
    import cn from "classnames";

    export let title: string;
    export let description: string;
    export let language: string;
    export let href: string;
    export let gradient: string;
</script>

<a {href} target="_blank" class={cn(
    "transform hover:scale-[1.01] hover:-translate-y-1 transition-all",
    "rounded-xl w-full p-1 shadow-lg hover:bg-gradient-to-r",
    gradient
)}>
    <div class="flex flex-col w-full h-full bg-white dark:bg-gray-900 rounded-lg p-4">
        <p class="text-xl">{title}</p>
        <p class="text-gray-600 italic mb-auto">{description}</p>
        <p>{language}</p>
    </div>
</a>