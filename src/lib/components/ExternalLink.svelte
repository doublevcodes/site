<script lang="ts">
    export let href: string;
</script>

<a class="text-gray-500 hover:text-gray-600 transition" target="_blank" rel="noopener noreferrer" {href}>
    <slot />
</a>