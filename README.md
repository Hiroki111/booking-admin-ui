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

export function useRoutes(allRoutes: RouteProps[]) {
    const [routes] = useState(allRoutes.filter(Boolean));
    return routes;
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


// in each page...
export function ExamplePage() {
    const routes = useRoutes([
        {
            path: getRoute(ROUTES.example.blog.post.new),
            component: ExamplePostNewPage,
            exact: true,
        },
        {
            path: `${getRoute(ROUTES.example.blog.post.translate)}/:translateId/:language`,
            component: ExamplePostTranslatePage,
            exact: true,
        },
        {
            path: `${getRoute(ROUTES.example.blog.post.edit)}/:postId`,
            component: ExamplePostEditPage,
            exact: true,
        },
    ]);

    return <Navigator routes={routes} />;
}

// Navigator 
interface Props {
    routes: RouteProps[];
}

export function Navigator({ routes }: Props) {
    const validRoutes = routes.filter(Boolean);
    let redirectTo = validRoutes[0] && validRoutes[0].path;

    const queryParams = window.location.search || '';
    redirectTo = `${redirectTo}${queryParams}`;

    return (
        <Switch>
            {validRoutes.filter(Boolean).map((route: RouteProps) => (
                <Route key={String(route.path)} {...route} />
            ))}

            {redirectTo && <Redirect to={redirectTo} />}
        </Switch>
    );
}


// each pages are

export function getRootRoutes(): RouteProps[] {
    return [
        {
            path: getRoute(ROUTES.cms),
            component: ExamplePage,
        }
        // other obj here
    ]
}

