<script lang="ts">
  type TPost = {
    slug: string;
    title: string;
    date?: string;
    category?: string;
  };

  export let page: TPost;
</script>

<div class="post">
  <div>
    <a href={`/${page.slug}`} class="title">
      {page.title}
    </a>
    <div class="tags">
      {#if page.date}
        <div class="tag">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6z"
              />
            </svg>
          </div>
          <div class="text">
            {page.date}
          </div>
        </div>
      {/if}

      {#if page.category}
        <div class="tag">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              ><path
                fill="currentColor"
                d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
              /></svg
            >
          </div>
          <div class="text">
            {page.category}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .post {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    background: var(--color-bg-layer1);
    width: 100%;
    padding-top: 1.25rem;
    padding-bottom: 1rem;
    padding-left: 2.25rem;
    padding-right: 0.75rem;
    border-radius: 1rem;
    position: relative;

    box-shadow: var(--box-shadow-light);
    border: var(--box-border-light);
  }

  @media (max-width: 700px) {
    .post {
      border-radius: 0px;
      border-bottom: 1px dashed #ffffff26;
    }
  }

  .title {
    font-size: 1.4rem;
    line-height: 2.25rem;
    width: 100%;

    color: var(--color-text);
    text-decoration: none;

    transition: color 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .title:hover {
    color: var(--color-accent-1);
  }

  .title::before {
    content: "";
    border-radius: 0.375rem;
    background-color: var(--color-accent-1);

    width: 0.25rem;
    height: 1.25rem;
    top: calc(1.25rem + 0.5rem);
    left: 18px;

    display: block;
    position: absolute;
  }

  .tags {
    display: flex;
    gap: 0.5rem;

    margin-top: 0.75rem;
  }

  .tag {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .tag > .icon {
    color: var(--color-accent-1);
    border-radius: 0.5rem;
    width: 2rem;
    height: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--color-accent-2-hover);

    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .tag > .text {
    line-height: 1;
    color: var(--color-tag);
  }
</style>
