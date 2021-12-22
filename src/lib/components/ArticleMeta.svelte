<script lang="ts">
    export let slug: string = "";
    export let date;

    const formattedDate = new Date(date).toLocaleDateString();
</script>

{#if slug}
    <p class="m-0 mx-auto mt-3">
        <span class="text-gray-600">{formattedDate}</span>
    </p>
{/if}