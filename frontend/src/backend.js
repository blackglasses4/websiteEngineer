import { BACKEND_URL } from "./config";

function getToken() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.error("Brak tokenu w sessionStorage");
    }
    return token;
}

async function get(endpoint, params) {
    const paramsStr = params ? `?${Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')}` : "";

    const url = `${BACKEND_URL}${endpoint}${paramsStr}`;
    const token = getToken();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (response.status === 401) {
        alert('Twoja sesja wygasła. Zaloguj się ponownie.');
        window.location = '/login';
        return;
    }
    
    return response;
}

async function post(endpoint, indata) {
    const token = getToken();

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(indata),
    });

    if (response.status === 401) {
        alert('Twoja sesja wygasła. Zaloguj się ponownie.');
        window.location = '/login';
        return;
    }

    return response;
}

async function put(endpoint, indata) {
    const token = getToken();

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(indata),
    });

    if (response.status === 401) {
        alert('Twoja sesja wygasła. Zaloguj się ponownie.');
        window.location = '/login';
        return;
    }

    return response;
}

async function changeUserPassword(id, new_password) {
    const token = getToken();

    const response = await fetch(`${BACKEND_URL}/user/${id}/change-password?new_password=${new_password}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        alert('Twoja sesja wygasła. Zaloguj się ponownie.');
        window.location = '/login';
        return;
    }

    return response;
}

async function del(endpoint, id) {
    const token = getToken();

    const response = await fetch(`${BACKEND_URL}${endpoint}${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        alert('Twoja sesja wygasła. Zaloguj się ponownie.');
        window.location = '/login';
        return;
    }

    return response;
}

//wyświetlanie

async function getProducts(params) {
    const product = await get('/products', params);
    return product;
}

async function getAllProducts() {
    const product = await get('/products/all');
    return product;
}

async function getProduct(id) {
    const product = await get(`/product/${id}`);
    return product;
}
//products_list

async function getOrders(params) {
    const x = await get('/orders', params);
    return x;
}

async function getUsers(params) {
    const x = await get('/users', params);
    return x;
}

//dodawanie
async function addProduct(product) {
    return post('/product', product);
}

async function addOrder(order) {
    return post('/order', order);
}

async function addUser(user) {
    return post('/user', user);
}

//edytowanie
async function saveProduct(product) {
    return put(`/product/${product.id}`, {
        id: product.id,
        category: product.category,
        gender: product.gender,
        name: product.name,
        image: product.image,
        popular: product.popular,
        new_price: product.new_price,
        old_price: product.old_price,
        description: product.description,
        sizes: product.sizes,
        colors: product.colors,
        material: product.material,
});
}

async function saveUser(user) {
    return put(`/user/${user.id}`, {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        password: user.password,
        is_admin: user.is_admin,
    });
}

//usuwanie
async function deleteProduct(product) {
    return del('/product/', product);
}

async function deleteUser(user) {
    return del('/user/', user);
}

async function deleteOrder(order) {
    return del('/order/', order);
}

//edytowanie

async function editUser(user) {
    return put(`/edit_user/${user.id}`, {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        password: user.password,
        is_admin: user.is_admin,
    });
}

export {
    getProducts,
    getProduct,
    getOrders,
    getUsers,
    getAllProducts,

    addOrder,
    addProduct,
    addUser,

    saveProduct,
    saveUser,

    deleteProduct,
    deleteUser,
    deleteOrder,

    changeUserPassword
};