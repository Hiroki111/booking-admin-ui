import { Route } from 'react-router-dom';

import { PATHS } from '../../../../../staticData/routes';
import { Nagivation } from './Nagivation';
import { StaffAvailabilities } from './StaffAvailabilities';
import { StaffList } from './StaffList';

export function Staff() {
  return (
    <>
      <Nagivation />
      <Route exact path={PATHS.staff} component={StaffList} />
      <Route exact path={PATHS.staffAvailabilities} component={StaffAvailabilities} />
    </>
  );
}
