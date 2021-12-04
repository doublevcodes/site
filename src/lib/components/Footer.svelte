<script lang="ts">
    import ExternalLink from "./ExternalLink.svelte";
</script>

<footer class="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
    <hr class="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
    <div class="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div class="flex flex-col space-y-4">
            <a class="text-gray-500 hover:text-gray-600 transition" href="/">Home</a>
            <a class="text-gray-500 hover:text-gray-600 transition" href="/about">About</a>
        </div>
        <div class="flex flex-col space-y-4">
            <ExternalLink href="https://twitter.com/doublvcodes/">Twitter</ExternalLink>
            <ExternalLink href="https://github.com/doublevcodes/">GitHub</ExternalLink>
        </div>
        <div class="flex flex-col space-y-4">
              <a class="text-gray-500 hover:text-gray-600 transition" href="/uses">Uses</a>
              <a class="text-gray-500 hover:text-gray-600 transition" href="/tweets">Tweets</a>
          </div>
    </div>
</footer>