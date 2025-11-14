import { RoleType } from '@/lib/types/role.type';
import SaboteurAction from './SaboteurAction';
// import EngineerAction from './EngineerAction';
// import DrunkAction from './DrunkAction';
// ...import other role actions
import PsychicAction from './PsychicAction';

export function RoleActionDispatcher({
  roleName,
  roles,
  setHasPerformedAction,
  ...props
}: {
  roleName: string;
  roles: RoleType[];
  setHasPerformedAction: (v: boolean) => void;
  [key: string]: unknown;
}) {
  switch (roleName) {
    case 'Saboteur':
      return (
        <SaboteurAction
          roles={roles}
          setHasPerformedAction={setHasPerformedAction}
          {...props}
        />
      );
    case 'Engineer':
    //   return <EngineerAction {...props} />;
    case 'Drunk':
    //   return <DrunkAction {...props} />;
    // ...other roles
    case 'Psychic':
      return (
        <PsychicAction
          roles={roles}
          setHasPerformedAction={setHasPerformedAction}
          {...props}
        />
      );
    default:
      return <div>No special action for this role.</div>;
  }
}
