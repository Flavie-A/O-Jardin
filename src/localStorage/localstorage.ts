export function addTokenToLocalStorage(
  token: string
  // firstname: string
) {
  localStorage.setItem('token', token);
  // localStorage.setItem('firstname', firstname);
}

export function getTokenFromLocalStorage() {
  const token = localStorage.getItem('token');
  // const firstname = localStorage.getItem('firstname');

  return { token };
}
