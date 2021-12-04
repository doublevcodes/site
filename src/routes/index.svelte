<script lang="ts">
    import Container from "$lib/components/Container.svelte";
</script>

<head>
    <title>Vivaan Verma</title>

    <og:title>Vivaan Verma</og:title>
    <og:description>Hey! I'm Vivaan Verma and a 13 year old passionate about development, aviation and astronomy.</og:description>
    <og:url>https://vivaanverma.com</og:url>
    <og:type>website</og:type>
</head>

<Container>
    <div class="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div class="flex flex-col-reverse sm:flex-row items-start">
          <div class="flex flex-col pr-8">
            <h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Vivaan Verma
            </h1>
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
              class="rounded-full filter grayscale hover:grayscale-0 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 duration-200"
            />
          </div>
        </div>
        <h3 class="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Featured Projects
        </h3>
        <span class="h-16" />
      </div>
</Container>