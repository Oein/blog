export type TProject = {
  name: string;
  url: string;
};

export type TLink = {
  name: string;
  url: string;
  iconSVG: string;
};

export type TConfig = {
  blogName: string;

  name: string;
  bio: string;

  profileImageURL: string;
  bannerImageURL: string;

  projects: TProject[];

  social: {
    github?: string;
    x?: string;
  };

  links: TLink[];

  api: {
    POSTS_PER_PAGE: number;

    GTAG_ID?: string;
  };
};

export const config: TConfig;
