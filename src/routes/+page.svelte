<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import Post from "./components/Post.svelte";
  import SkeletonPost from "./components/SkeletonPost.svelte";
  import { config } from "./config";

  type TPost = {
    slug: string;
    title: string;
    date?: string;
    category?: string;
  };

  let posts: TPost[] = [];
  let loading = false;
  let initialLoading = true;
  let currentPage = 1;
  let hasMore = true;
  let sechkwd: string = "";
  let searchTimeout: NodeJS.Timeout;
  let scrollContainer: HTMLElement;
  let previousSearch = "";

  // Fetch posts from API
  async function fetchPosts(
    page: number = 1,
    search: string = "",
    reset: boolean = false
  ) {
    if (loading) return;

    loading = true;

    try {
      const searchParams = new URLSearchParams();
      if (search) {
        searchParams.set("search", search);
      }

      const response = await fetch(
        `/api/posts/${page}?${searchParams.toString()}`
      );
      const data = await response.json();

      if (reset) {
        posts = [];
      }

      const chunkedPosts = [];
      for (let i = 0; i < data.length - 1; i += 4) {
        chunkedPosts.push(data.slice(i, i + 4));
      }

      // Transform the API response to match our TPost type
      const newPosts = chunkedPosts.map((post: string[]) => ({
        slug: post[0],
        title: post[1],
        category: post[2] || undefined,
        date: post[3]
          ? new Date(parseInt(post[3])).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : undefined,
      }));

      posts = [...posts, ...newPosts];
      hasMore = data[data.length - 1] || false;
      currentPage = page;
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      loading = false;
      initialLoading = false;
    }
  }

  // Handle search with debounce
  function handleSearchInput() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (sechkwd !== previousSearch) {
        previousSearch = sechkwd;
        currentPage = 1;
        fetchPosts(1, sechkwd, true);
      }
    }, 300);
  }

  // Handle scroll for infinite loading
  function handleScroll() {
    if (loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    const threshold = 200; // Load more when 200px from bottom

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      fetchPosts(currentPage + 1, sechkwd);
    }
  }

  // Initialize
  onMount(() => {
    fetchPosts();

    // Set up scroll container (window in this case)
    scrollContainer = document.documentElement;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(searchTimeout);
    };
  });

  // Watch search input
  $: if (typeof sechkwd !== "undefined") {
    handleSearchInput();
  }
</script>

<svelte:head>
  <title>{config.blogName}</title>
</svelte:head>

<div class="posts">
  <input
    bind:value={sechkwd}
    class="schkwd"
    placeholder="검색어"
    on:input={handleSearchInput}
  />

  {#if initialLoading}
    <SkeletonPost />
    <SkeletonPost />
    <SkeletonPost />
    <SkeletonPost />
    <SkeletonPost />
  {:else}
    {#each posts as post (post.slug)}
      <Post page={post} />
    {/each}

    {#if posts.length === 0 && !loading}
      <div class="no-posts">
        {sechkwd
          ? `"${sechkwd}"에 대한 검색 결과가 없습니다.`
          : "게시물이 없습니다."}
      </div>
    {/if}

    {#if loading && posts.length > 0}
      <SkeletonPost />
      <SkeletonPost />
    {/if}

    {#if !hasMore && posts.length > 0}
      <div class="end-message">모든 게시물을 불러왔습니다.</div>
    {/if}
  {/if}
</div>

<style>
  .posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .schkwd {
    width: 100%;
    padding: 0.85rem 1rem;
    background: var(--color-bg-layer2);
    outline: none;
    color: var(--color-fg);
    border: none;
    font-size: 16px;
    border-radius: 0.5rem;
    transition: box-shadow 0.2s ease;
  }

  .schkwd:focus {
    box-shadow: 0 0 0 2px var(--color-primary, #007acc);
  }

  .no-posts {
    padding: 2rem;
    text-align: center;
    color: var(--color-fg-muted, #666);
    font-style: italic;
  }

  .end-message {
    padding: 1rem;
    text-align: center;
    color: var(--color-fg-muted, #666);
    font-size: 0.9rem;
    opacity: 0.7;
  }

  @media (max-width: 700px) {
    .posts {
      gap: 0px;
    }

    .schkwd {
      border-radius: 0;
    }
  }
</style>
