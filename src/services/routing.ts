import dayjs from 'dayjs';

interface PathParam {
  [pathName: string]: string;
}

export function getPathWithParam(path: string, pathParam: PathParam) {
  const searchParams = new URLSearchParams(window.location.search);
  const newPath = Object.keys(pathParam).reduce((newPath, pathName) => {
    const paramValue = pathParam[pathName];
    return newPath.replace(pathName, paramValue);
  }, path);

  if (searchParams.toString()?.length) {
    return `${newPath}?${searchParams.toString()}`;
  }
  return newPath;
}

export function getUrlWithYearAndMonth(date: Date) {
  const searchParams = new URLSearchParams(window.location.search);
  const year = dayjs(date).format('YYYY');
  const month = dayjs(date).format('MM');
  searchParams.set('year', year);
  searchParams.set('month', month);

  return `${window.location.pathname}?${searchParams.toString()}`;
}
