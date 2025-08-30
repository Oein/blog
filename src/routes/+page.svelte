<script lang="ts">
  import { onMount } from "svelte";
  import Post from "./components/Post.svelte";
  import SkeletonPost from "./components/SkeletonPost.svelte";
  import { config } from "./config";
  import { disassemble } from "es-hangul";

  import { decompress } from "lz4js";

  type TPost = {
    slug: string;
    title: [string, string];
    date?: string;
    category?: [string, string];
  };

  let loading = true;
  let initialLoading = true;
  let hasMore = true;

  let allPosts: TPost[] = [];
  let posts: TPost[] = [];
  let filtered: TPost[] = [];
  let sechkwd = "";

  let currentPage = 1;
  let searchTimeout: NodeJS.Timeout;
  let scrollContainer: HTMLElement;
  let previousSearch = "";

  const Base64 = {
    _Rixits: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/",
    toNumber: function (rixits_: string) {
      var result = 0;
      let rixits = rixits_.split("");
      for (var e = 0; e < rixits.length; e++) {
        result = result * 64 + this._Rixits.indexOf(rixits[e]);
      }
      return result;
    },
  };

  const fetchPosts = async (page: number, reset: boolean = false) => {
    loading = true;
    if (reset) posts = [];

    posts = [
      ...posts,
      ...filtered.slice(
        (page - 1) * config.api.POSTS_PER_PAGE,
        page * config.api.POSTS_PER_PAGE
      ),
    ];

    hasMore = filtered.length > page * config.api.POSTS_PER_PAGE;

    loading = false;
  };
  const handleSearchInput = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (sechkwd !== previousSearch) {
        previousSearch = sechkwd;
        const diskwd = disassemble(sechkwd);
        filtered = posts.filter((post) => {
          return (
            post.title[1].includes(diskwd) ||
            (post.category || ["", ""])[1].includes(diskwd)
          );
        });
        currentPage = 1;
        fetchPosts(1, true);
      }
    }, 200);
  };
  const fetchAllPosts = async () => {
    loading = true;

    const web = await fetch("/build/search.lz4");
    const buf = await web.arrayBuffer();
    const txt = [...decompress(new Uint8Array(buf))]
      .map((c) => String.fromCharCode(c))
      .join("");
    const data = txt.split("\n").map((x) => decodeURIComponent(x));

    for (let i = 0; i + 3 < data.length; i += 4) {
      allPosts.push({
        slug: data[i],
        title: [data[i + 1], disassemble(data[i + 1])],
        category:
          data[i + 2] == ""
            ? undefined
            : [data[i + 2], disassemble(data[i + 2])],
        date:
          data[i + 3] == ""
            ? undefined
            : new Date(Base64.toNumber(data[i + 3])).toLocaleDateString(
                "ko-KR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              ),
      });
    }

    hasMore = true;
    loading = false;
    initialLoading = false;
  };
  const handleScroll = () => {
    if (loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    const threshold = 200; // Load more when 200px from bottom

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      fetchPosts(currentPage + 1, false);
      currentPage += 1;
    }
  };

  onMount(() => {
    if (initialLoading && typeof window != "undefined") {
      fetchAllPosts().then(() => {
        filtered = allPosts;
        fetchPosts(1);
      });
    }

    scrollContainer = document.documentElement;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(searchTimeout);
    };
  });
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
      <Post
        page={{
          slug: post.slug,
          title: post.title[0],
          date: post.date,
          category: post.category ? post.category[0] : undefined,
        }}
      />
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

    box-shadow: var(--box-shadow-light);
    border: var(--box-border-light);
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
