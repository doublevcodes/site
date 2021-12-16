<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const posts = await fetch('/blog.json').then((res) => res.json());
		return {
			props: {
				posts
			}
		};
	}
</script>

<script>
	import PageHead from '$lib/components/PageHead.svelte';
	import Article from '$lib/components/Article.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';
	import ArticleDescription from '$lib/components/ArticleDescription.svelte';
	export let posts;
</script>

<PageHead title="Home" description="An awesome blog about development with Svelte" />

{#each posts as { slug, title, _, description, date }}
	<Article>
		<ArticleTitle {slug} {title} />
        <ArticleDescription {description} {slug} />
		<ArticleMeta {date} {slug}/>
	</Article>
{/each}

<slot />