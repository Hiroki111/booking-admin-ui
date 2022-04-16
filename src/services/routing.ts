interface RouteParam {
  [paramName: string]: string | number;
}

export function getRouteWithParam(route: string, routeParam: RouteParam) {
  return Object.keys(routeParam).reduce((newRoute, paramName) => {
    const paramValue = routeParam[paramName];
    return newRoute.replace(paramName, String(paramValue));
  }, route);
}
