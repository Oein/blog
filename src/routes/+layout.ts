export const prerender = true;

export const load: any = ({ url }: any) => {
  const { pathname } = url;

  return {
    pathname,
  };
};
