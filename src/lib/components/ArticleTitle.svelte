<script lang="ts">
    export let slug: string = '';
    export let title: string;

    const id = title
        .toLowerCase()
        .replace(/[^a-zA-Z ]/g, '')
        .replace(/\s/g, '-');

    const href = slug ? `/blog/${slug}` : `#${id}`;
</script>

{#if slug}
<h3 class="m-0 mb-3 hover:underline font-bold text-2xl md:text-4xl tracking-tight mx-auto" {id}>
    <a {href}>
        {title}
    </a>
</h3>
{:else}
<h3 class="m-0 mb-10 underline font-bold text-3xl md:text-5xl tracking-tight mx-auto duration-200 hover:pb-6 text-black dark:text-white hover:p-3 hover:bg-black hover:text-white hover:shadow-xl" {id}>
    <a {href}>
        {title}
    </a>
</h3>
{/if}