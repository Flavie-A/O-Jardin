function setCookie(name: string, value: string | null, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function addTokenToCookies(
  token: string | null
) {
  setCookie('token', token, 7);
}

export function getTokenfromCookies() {
  const token = document.cookie.substring(6);
  console.log(token)
  return  token ;
}
