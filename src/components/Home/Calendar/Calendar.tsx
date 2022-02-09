import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  isDrawerOpening?: boolean;
  handleDrawerOpen?: () => void;
}

export function Calendar({ isDrawerOpening, handleDrawerOpen }: Props) {
  return <div>calendar</div>;
}
