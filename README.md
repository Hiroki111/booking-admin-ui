## TODO

- I've update EditBookingDialog with FormDialog\_ components.
  Write tests for EditStaffDialog, DeleteAlertDialog, UploadAvatarDialog
- Consider using Formik to improve FormDialog
- On Booking editor, wouldn't it be better to refresh the staff list every time
  date, time, selected services are updated?
  It's annoying to see "**_ can't do _**" or "**_ isn't available on _**"
  -> But this approach won't show all the staff

- Create a view file for timeslots

- Change fetch**_Query into { data: _** } for the sake of consistency

## Auto-component generation

Install Folder Templates (https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure)

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
