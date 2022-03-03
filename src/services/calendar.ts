import { ALL_STAFF } from '../contexts/CalendarContext';
import { StaffOption } from '../interfaces/calendar';
import { Staff } from '../interfaces/staff';

export function createStaffOptions(staffList: Staff[]) {
  return [
    ALL_STAFF,
    ...staffList
      .sort((staffA, staffB) => staffA.name.localeCompare(staffB.name))
      .map((staff) => ({ id: staff.id, name: staff.name } as StaffOption)),
  ];
}
