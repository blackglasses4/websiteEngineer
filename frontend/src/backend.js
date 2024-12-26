import { BACKEND_URL } from "./Components/config";

async function get(endpoint, params) {
    const paramsStr = params ? `?${Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')}` : "";

    const url = `${BACKEND_URL}${endpoint}${paramsStr}`;
    const response = await fetch(url);
    
    if (response.status === 401) {
        alert('Twoja sesja wygasła. Zaloguj się ponownie.');
        window.location = '/login';
        return;
    }

    // console.debug(response);

    return response;
}

async function post(endpoint, indata) {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: indata ? JSON.stringify(indata) : '',
    });

    // console.debug(response);

    if (response.status === 401) {
        alert('Twoja sesja wygasła. Zaloguj się ponownie.');
        window.location = '/login';
        return;
    }

    return response;
}

async function getProducts(params) {
    const x = await get('/products', params);
    console.log(x);
    return x;
}


async function addProduct(product) {
    return post('/products', product);
}

export {
    getProducts,
    addProduct
};
