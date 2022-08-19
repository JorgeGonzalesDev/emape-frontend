const GET = () => {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
};

const POST = body => {
    return {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    };
};

const POST_FORM_DATA = body => {
    return {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: body,
    };
};

const PUT = body => {
    return {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    };
};

const PUT_FORM_DATA = body => {
    return {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
        },
        body: body,
    };
};

const DELETE = (body) => {
    return {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    };
};

export { GET, POST, POST_FORM_DATA, PUT, PUT_FORM_DATA, DELETE };
