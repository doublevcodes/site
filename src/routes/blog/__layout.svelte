<script lang="ts" context="module">
    /**
     * @type {import('@sveltejs/kit').Load}
    */
   export async function load({ page, fetch }: any) {
       let post = (await fetch(`${page.path}.json`).then(res => res.json()));
       if (post[0] === undefined) {} else { post = post[0]; }
       if (!post || !post.published) {
           return {
               status: 404,
               error: new Error('Post not found')
           }
       }

       return {
           props: {
               post
           }
       }
   }
</script>

<script lang="ts">
    import PageHead from "$lib/components/PageHead.svelte";
    import ArticleTitle from "$lib/components/ArticleTitle.svelte";
    import ArticleMeta from "$lib/components/ArticleMeta.svelte";
    import Container from "$lib/components/Container.svelte";

    export let post;
</script>

<PageHead title={post.title} description={post.description}/>

<Container>
        <ArticleTitle title={post.title} />
        <ArticleMeta date={post.date} />
        <div class="mx-auto w-full mb-3">
            <slot />
        </div>
</Container>
