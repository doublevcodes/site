<script lang="ts">
    import { initClient, operationStore, query } from "@urql/svelte"

    import Container from "$lib/components/Container.svelte";
    import RepoCard from "$lib/components/RepoCard.svelte";

    const client = initClient({
        url: "https://api.github.com/graphql",
        fetchOptions: {
            headers: {
                authorization: "Bearer " + import.meta.env.VITE_GITHUB_API_TOKEN
            }
        }
    })

    const pinnedItems = operationStore(`
        query {
            viewer {
                pinnedItems(first: 10) {
                    edges {
                        node {
                            ... on Repository {
                                name
                                description
                                primaryLanguage {
                                    color
                                    name
                                }
                                url
                            }
                        }
                    }
                }
            }
        }
    `);

    query(pinnedItems);
</script>

<head>
    <title>Vivaan Verma</title>
</head>

<Container>
    <div class="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div class="flex flex-col-reverse sm:flex-row items-start">
          <div class="flex flex-col pr-8">
            <div>
                <h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-3 text-black dark:text-white hover:mb-6 hover:p-3 hover:bg-black hover:text-white hover:shadow-xl duration-300 w-max">
                    Vivaan Verma
                </h1>
            </div>
            <h2 class="text-gray-700 dark:text-gray-200 mb-4">
              13 years old and passionate about development, aviation and astronomy.
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-16">
              Developing on the edge and in the cloud, I'm a self-taught developer with a passion for learning and building.
            </p>
          </div>
          <div class="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
            <img
              alt="Vivaan Verma"
              height={178}
              width={178}
              src="/images/vivaan.jpg"
              class="rounded-full filter grayscale hover:grayscale-0 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 hover:rotate-2 duration-200"
            />
          </div>
        </div>
        <h3 class="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white hover:underline">
          Featured Projects
        </h3>
        {#if $pinnedItems.fetching}
        <p>Loading...</p>
        {:else if $pinnedItems.error}
        <p>Oh no... {$pinnedItems.error.message}</p>
        {:else}
            <div class="grid grid-cols-2 grid-rows-2 gap-6 content-end w-full">
                {#each $pinnedItems.data.viewer.pinnedItems.edges as repo}
                    <RepoCard title={repo.node.name} description={repo.node.description} href={repo.node.url} language={repo.node.primaryLanguage.name} gradient="hover:from-[#D8B4FE] hover:to-[#818CF8]"/>
                {/each}
            </div>
        {/if}
        <span class="h-16" />
      </div>
</Container>