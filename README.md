## TODO
- booking edit modal should persist with URL
- booking edit modal: create a new booking -> the modal will update the same booking
- booking edit modal's component name should be "EditBookingDialog"

Update routes

export function getRoute(route: {} | string, params: {} = {}): string {
    return Object.keys(params).reduce(
        (route, key) => route.replace(`:${key}`, params[key]),
        (route as { '@route': string })['@route'] || (route as string),
    );
}

export function getOldRoute(route: keyof typeof oldRoutes) {
    return `${getRoute(ROUTES.oldBackoffice, { url: route })}`;
}

export function getOldBackofficeUrl(url: string, params: {} = {}): string {
    const { OLD_BACKOFFICE_URL } = getStoreValue(stores.environment);
    url = params ? `${url}?${stringify(params)}` : url;
    return `${OLD_BACKOFFICE_URL}/${url}`;
}

export function useRoutes(allRoutes: RouteProps[]) {
    const [routes] = useState(allRoutes.filter(Boolean));
    return routes;
}

export function isActiveRoute(route, exact = true) {
    return Boolean(
        matchPath(window.location.pathname, {
            path: route,
            exact,
        }),
    );
}

function generateRoutes(routes, routeBase, key) {
    routeBase = `${routeBase}/${kebabCase(key)}`;
    Object.keys(routes).forEach((key) => {
        if (!key.startsWith('@')) {
            generateRoutes(routes[key], routeBase, key);
        }
    });

    routes['@route'] = routes['@params']
        ? Object.keys(routes['@params']).reduce(
              (route, paramKey) => route.concat(`:${routes['@params'][paramKey]}/`),
              routeBase.concat('/'),
          )
        : routeBase;
}

function initRoutes() {
    Object.keys(ROUTES).forEach((key) => {
        generateRoutes(ROUTES[key], '', key);
    });
}

initRoutes();
