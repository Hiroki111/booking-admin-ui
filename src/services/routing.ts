interface RouteParam {
  [paramName: string]: string | number;
}

export function getRouteWithParam(route: string, routeParam: RouteParam) {
  Object.keys(routeParam).forEach((paramName) => {
    const paramValue = routeParam[paramName];
    route = route.replace(paramName, String(paramValue));
  });
  return route;
}
