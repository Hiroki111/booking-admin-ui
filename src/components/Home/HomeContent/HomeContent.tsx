import { Body } from './Body';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useStyles } from './useStyles';

export function HomeContent() {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <Sidebar />
        <Body />
      </div>
    </div>
  );
}
