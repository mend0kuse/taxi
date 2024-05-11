export const ROUTES = {
    MAIN: '/',
    PROFILE: (id: number) => `/profile/${id}`,
    SERVICE: (id: number) => `/service/${id}`,
    CATALOG: `/catalog`,
    REGISTRATION: `/registration`,
    LOGIN: '/login',
    CREATE_SERVICE: '/create-service',
};
