<script>
  import { config } from "../config";
  import ThemeToggle from "./ThemeToggle.svelte";
</script>

<header>
  <a href="/" class="main">
    <svg class="home" height="1.75rem" viewBox="0 0 24 24" width="1.75rem"
      ><symbol id="ai:material-symbols:home-outline-rounded"
        ><path
          d="M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75"
          fill="currentColor"
        ></path></symbol
      ><use xlink:href="#ai:material-symbols:home-outline-rounded"></use></svg
    >
    <div>{config.blogName}</div>
  </a>

  <div class="nav-items">
    <a href="/about" class="bookmarks">
      <div>소개</div>
    </a>
    <ThemeToggle />
  </div>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    background: var(--color-bg-layer1);
    padding-left: 1rem;
    padding-right: 1rem;

    border-radius: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    height: 4.5rem;
    /* margin-left: auto; */
    /* margin-right: auto; */

    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: visible;

    max-width: var(--page-width);
    width: 100%;
    z-index: 7;

    box-shadow: var(--box-shadow);
  }

  a {
    color: var(--color-fg);
    text-decoration: none;

    height: 3.25rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    height: 3.25rem;

    position: relative;
    z-index: 0;

    font-size: 14px;

    display: flex;
    align-items: center;
    color: var(--color-accent-1);
  }

  a::before {
    background: var(--color-accent-1-hover);
    content: "";

    position: absolute;
    inset: 0;
    z-index: -10;
    border-radius: 0.5rem;
    opacity: 0;
    scale: 0;

    transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  a:hover::before {
    opacity: 1;
    scale: 1;
  }

  .main {
    font-weight: bold;
  }

  .home {
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;

    display: block;
  }

  .bookmarks {
    height: fit-content;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .nav-items {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
