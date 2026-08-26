import type { Team } from "@/types/team";

/**
 * Fixed logos for now while in development stages.
 */
const getLogo = (team: Team) => {
  switch (team.id) {
    case 1:  return "campbelltown-carabaos-sm.png";
    case 2:  return "liverpool-lions-sm.png";
    case 3:  return "mount-druitt-maniyaks-sm.png";
    default: return "edmondson-park-eagles-sm.png"; /* or ID 4 for now */
  }
};

const getLogoUrl = (team: Team) => {
  return `/images/logos/${getLogo(team)}`;
};

type Props = {
  team: Team,
};

function TeamLogo(props: Props) {
  const { team } = props;

  return (
    <>
      <img src={getLogoUrl(team)} alt={team.name} />
    </>
  );
}

export default TeamLogo;
