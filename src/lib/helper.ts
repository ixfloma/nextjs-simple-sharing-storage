export function routerShallowReplace(pathname: string) {
  window.history.replaceState({}, "", `${pathname}`);
}