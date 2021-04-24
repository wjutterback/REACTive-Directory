const BASEURL = 'https://randomuser.me/api?results=50';

export const API = {
  search: () => fetch(BASEURL),
};
