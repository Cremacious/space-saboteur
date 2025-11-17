import { RoleType } from '@/lib/types/role.type';
import SaboteurAction from './SaboteurAction';
import EngineerAction from './EngineerAction';
import DrunkAction from './DrunkAction';
import PsychicAction from './PsychicAction';
import InsomniacAction from './InsomniacAction';
import SpyAction from './SpyAction';
import KleptomaniacAction from './KleptomaniacAction';

export function RoleActionDispatcher({
  roleName,
  roles,
  setHasPerformedAction,
  userId,
  gameCode,
  ...props
}: {
  roleName: string;
  roles: RoleType[];

  setHasPerformedAction: (v: boolean) => void;
  userId: string;
  gameCode: string;
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
      return (
        <EngineerAction
          roles={roles}
          setHasPerformedAction={setHasPerformedAction}
          userId={userId}
          gameCode={gameCode}
        />
      );
    case 'Drunk':
      return (
        <DrunkAction
          roles={roles}
          setHasPerformedAction={setHasPerformedAction}
          userId={userId}
          gameCode={gameCode}
        />
      );
    case 'Psychic':
      return (
        <PsychicAction
          roles={roles}
          setHasPerformedAction={setHasPerformedAction}
          {...props}
        />
      );
    case 'Insomniac':
      return (
        <InsomniacAction
          roles={roles}
          setHasPerformedAction={setHasPerformedAction}
          userId={userId}
        />
      );
    case 'Spy':
      return (
        <SpyAction
          roles={roles}
          setHasPerformedAction={setHasPerformedAction}
          {...props}
        />
      );
    case 'Kleptomaniac':
      return (
        <KleptomaniacAction
          roles={roles}
          setHasPerformedAction={setHasPerformedAction}
          userId={userId}
          gameCode={gameCode}
        />
      );
    default:
      return <div>No special action for this role.</div>;
  }
}
