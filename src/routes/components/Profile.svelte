<script>
  import { config } from "../config";
</script>

<div class="rside">
  <div class="profile">
    <img src={config.profileImageURL} alt="profile" class="profile_image" />
    <div class="name">{config.name}</div>
    <div class="divider"></div>
    <div class="desc">{config.bio}</div>
    <div class="socials">
      {#if config.social.x}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <a href={config.social.x}>
          <svg height="1.5rem" viewBox="0 0 512 512" width="1.5rem"
            ><symbol id="ai:fa6-brands:x-twitter"
              ><path
                d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"
                fill="currentColor"
              ></path></symbol
            ><use xlink:href="#ai:fa6-brands:x-twitter"></use></svg
          >
        </a>
      {/if}
      {#if config.social.github}
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <a href={config.social.github}>
          <svg height="1.5rem" viewBox="0 0 496 512" width="1.5rem"
            ><symbol id="ai:fa6-brands:github"
              ><path
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6c-3.3.3-5.6-1.3-5.6-3.6c0-2 2.3-3.6 5.2-3.6c3-.3 5.6 1.3 5.6 3.6m-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9c2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3m44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9c.3 2 2.9 3.3 5.9 2.6c2.9-.7 4.9-2.6 4.6-4.6c-.3-1.9-3-3.2-5.9-2.9M244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2c12.8 2.3 17.3-5.6 17.3-12.1c0-6.2-.3-40.4-.3-61.4c0 0-70 15-84.7-29.8c0 0-11.4-29.1-27.8-36.6c0 0-22.9-15.7 1.6-15.4c0 0 24.9 2 38.6 25.8c21.9 38.6 58.6 27.5 72.9 20.9c2.3-16 8.8-27.1 16-33.7c-55.9-6.2-112.3-14.3-112.3-110.5c0-27.5 7.6-41.3 23.6-58.9c-2.6-6.5-11.1-33.3 2.6-67.9c20.9-6.5 69 27 69 27c20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27c13.7 34.7 5.2 61.4 2.6 67.9c16 17.7 25.8 31.5 25.8 58.9c0 96.5-58.9 104.2-114.8 110.5c9.2 7.9 17 22.9 17 46.4c0 33.7-.3 75.4-.3 83.6c0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252C496 113.3 383.5 8 244.8 8M97.2 352.9c-1.3 1-1 3.3.7 5.2c1.6 1.6 3.9 2.3 5.2 1c1.3-1 1-3.3-.7-5.2c-1.6-1.6-3.9-2.3-5.2-1m-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9c1.6 1 3.6.7 4.3-.7c.7-1.3-.3-2.9-2.3-3.9c-2-.6-3.6-.3-4.3.7m32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2c2.3 2.3 5.2 2.6 6.5 1c1.3-1.3.7-4.3-1.3-6.2c-2.2-2.3-5.2-2.6-6.5-1m-11.4-14.7c-1.6 1-1.6 3.6 0 5.9c1.6 2.3 4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2c-1.4-2.3-4-3.3-5.6-2"
                fill="currentColor"
              ></path></symbol
            ><use xlink:href="#ai:fa6-brands:github"></use></svg
          >
        </a>
      {/if}
    </div>
  </div>
  {#if config.projects && config.projects.length > 0}
    <div class="projects">
      {#each config.projects as project}
        <a href={project.url}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            class="icon"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm243.7 589.2L512 794 268.3 653.2V371.8l110-63.6-.4-.2h.2L512 231l134 77h-.2l-.3.2 110.1 63.6v281.4zM307.9 536.7l87.6 49.9V681l96.7 55.9V524.8L307.9 418.4zm203.9-151.8L418 331l-91.1 52.6 185.2 107 185.2-106.9-91.4-52.8zm20 352l97.3-56.2v-94.1l87-49.5V418.5L531.8 525z"
            ></path></svg
          >
          <div>{project.name}</div>
        </a>
      {/each}
    </div>
  {/if}

  {#if config.links && config.links.length > 0}
    <div class="projects">
      {#each config.links as link}
        <a href={link.url}>
          {@html link.iconSVG}
          <div>{link.name}</div>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .rside {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    height: fit-content;
    position: sticky;
    top: calc(4.5rem + 3rem);
    min-width: fit-content;

    overflow: auto;
    max-height: calc(100vh - 4rem - 2rem);
  }

  .rside > * {
    margin: auto;
    width: 100%;
    max-width: 17.5rem;

    background: var(--color-bg-layer1);
    border-radius: 1rem;
    padding: 0.75rem;
  }

  .profile_image {
    width: 100%;
    border-radius: calc(1rem - 0.75rem / 2);
    background: var(--color-bg-layer2);
  }

  .name {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    text-align: center;
  }

  .divider {
    width: 1.25rem;
    height: 0.25rem;
    background: var(--color-accent-1);
    margin: auto;
    border-radius: 9999px;
    margin-bottom: 0.625rem;
  }

  .desc {
    color: rgb(163 163 163);
    margin-bottom: 0.625rem;
    text-align: center;
    font-size: 14px;
  }

  .socials {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .socials > a {
    color: var(--color-icon);
    border-radius: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--color-accent-2);
    transition: background 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .socials > a:hover {
    background: var(--color-accent-2-hover);
  }

  .projects {
    display: flex;
  }

  .projects > a {
    width: 100%;
    color: var(--color-text);

    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    text-decoration: none;

    display: flex;
    padding: 0.75rem;
    gap: 0.75rem;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;

    transition: background 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .projects > a > :global(svg) {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .projects > a > div {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .projects > a {
    position: relative;
  }

  .projects > a > :global(*) {
    z-index: 2;
  }

  .projects > a::before {
    background: var(--color-accent-1-hover);
    content: "";

    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: 0.5rem;
    opacity: 0;
    scale: 0;

    transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .projects > a:hover::before {
    opacity: 1;
    scale: 1;
  }
</style>
