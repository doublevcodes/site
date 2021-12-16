<script lang="ts">
    import { page } from "$app/stores";

    import Footer from "$lib/components/Footer.svelte";
    import NavItem from "$lib/components/NavItem.svelte";

    export let customMeta = {
        date: "1/1/1970",
    };

    const path: string = $page.host + $page.path;
    const meta = {
        title: 'Vivaan Verma - Flying planes on the moon',
        description: 'A 13 year old developer, astronomer and aviation enthusiast',
        image: "https://nwidtdnbxzvgniyesizr.supabase.in/storage/v1/object/public/assets/banner.png",
        type: 'website',
        ...customMeta
    }
</script>

<head>
    <title>{meta.title}</title>
    <meta name="robots" content="follow, index" />
    <meta name="description" content={meta.description} />
    <meta property="og:url" content={`https://vivaanverma.com${path}`} />
    <link rel="canonical" href={`https://vivaanverma.com${path}`} />
    <meta property="og:type" content={meta.type} />
    <meta property="og:site_name" content="Vivaan Verma" />
    <meta property="og:description" content={meta.description} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:image" content={meta.image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@doublevcodes" />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={meta.image} />
    {#if meta.date !== "1/1/1970"}
        <meta property="article:published_time" content={meta.date} />
    {/if}
</head>
<div class="bg-gray-50 dark:bg-gray-900 selection:bg-[#D8B4FE]">
    <nav class="flex items-center justify-between w-full relative max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <div class="ml-[-0.60rem]">
            <NavItem href="/" text="Home" />
            <NavItem href="/dashboard" text="Dashboard" />
            <NavItem href="/blog" text="Blog" />
          </div>
    </nav>
    <main class="flex flex-col justify-center w-fit mx-auto px-8 bg-gray-50 dark:bg-gray-900">
        <slot />
        <Footer />
    </main>
</div>