<script lang="ts">
    export let description: string;
    export let slug: string = '';

    const href = slug && `blog/${slug}`;
</script>

<p class="m-0 italic mx-auto">
    {description}

    {#if slug}
        <a class="not-italic text-blue-600" {href}>Read more &rarr;</a>
    {/if}
</p>