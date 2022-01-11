export const setCookie  = (cookieName, cookieValue) =>{
    const date = new Date();
    date.setTime(
        date.getTime() + 365 * 24 * 60 * 60 * 1000
    );
    const expires = 'expires=' + date.toUTCString();
    // const secstr = ";secure";
    document.cookie =
        cookieName +
        '=' +
        cookieValue +
        ';' +
        expires +
        ';' +
        'host=' +
        ';path=/';
    // + ";SameSite=Lax" + secstr;
}
export const getCookie = (cookieName: any) => {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
