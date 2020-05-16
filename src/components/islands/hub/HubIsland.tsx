import { FC } from 'react';
import { IslandProps } from '../utils';
import IslandSVG from '../IslandSVG';
import {
  combat,
  epic,
  objectives,
  skills,
  special,
  teamwork,
  welcome
} from './levels';

const HubIsland: FC<IslandProps> = ({
  targetLevel,
  status,
  levels,
  onLevelClick,
  ...svgProps
}) => {
  return (
    <IslandSVG
      width="187"
      height="184"
      viewBox="0 0 187 184"
      fill="#2B2A30"
      status={status}
      levels={levels}
      data-tooltip-id="hub"
      {...svgProps}
    >
      <path
        d="M102 175.714L121 166L118.72 175.714M102 175.714H118.72M102 175.714L108.84 183L118.72 175.714"
        stroke="#EAEAEA"
        strokeWidth="0.781893"
      />
      <path
        d="M186 135H128V125.182H137.902V116.818H147.805V111H166.549V116.818H175.744V125.182H186V135Z"
        stroke="#EAEAEA"
        strokeWidth="0.781893"
      />
      <path d="M58.8856 11.2461H127.637L161.769 48.7914L162 97.5L145.35 130.691L127.637 157.275L90.6172 176.041L44.4855 147.893L22 96L29.6296 37.089L58.8856 11.2461Z" />
      <path
        d="M145.35 130.691L162 97.5L161.769 48.7914L127.637 11.2461H58.8856L29.6296 37.089L22 96L44.4855 147.893M145.35 130.691L127.637 157.275M145.35 130.691L133.621 120.342M127.637 157.275L90.6172 176.041M127.637 157.275L133.621 120.342M90.6172 176.041L44.4855 147.893M90.6172 176.041L58.8856 121.905L44.4855 147.893M90.6172 176.041L133.621 120.342"
        stroke="white"
        strokeWidth="0.781893"
      />
      <path
        d="M44 124H1V116.636H8.34146V110.364H15.6829V106H29.5793V110.364H36.3963V116.636H44V124Z"
        stroke="#EAEAEA"
        strokeWidth="0.781893"
      />
      <path
        d="M182 70H142V63.8636H148.829V58.6364H155.659V55H168.585V58.6364H174.927V63.8636H182V70Z"
        stroke="#EAEAEA"
        strokeWidth="0.781893"
      />
      <path
        d="M127.666 1H58.5077L22 39.0286V96.0349L58.5077 122H127.666H133.061L162 88.9102V39.0286L127.666 1Z"
        stroke="white"
        strokeWidth="0.781893"
      />
      <path
        d="M68 57.978L85.2586 74.0288M85.2586 74.0288L93.403 74.0288L101.935 74.0288M85.2586 74.0288L101.935 74.0288M101.935 74.0288L119 57.978"
        stroke="#EAEAEA"
      />
      <rect
        x="93.6964"
        y="85"
        width="1.01213"
        height="6.9509"
        transform="rotate(-180 93.6964 85)"
        fill="#EAEAEA"
      />
      <rect
        width="1.00874"
        height="6.99278"
        transform="matrix(-0.880299 -0.474419 0.4853 -0.874348 81.1869 83.0049)"
        fill="#EAEAEA"
      />
      <rect
        width="1.00874"
        height="6.99278"
        transform="matrix(0.880299 -0.474419 -0.4853 -0.874348 106.863 83.0049)"
        fill="#EAEAEA"
      />
      <rect
        width="1.0046"
        height="7.04404"
        transform="matrix(-0.704739 -0.709467 0.719767 -0.694216 72.7958 77.3257)"
        fill="#EAEAEA"
      />
      <rect
        width="1.0046"
        height="7.04404"
        transform="matrix(0.704739 -0.709466 -0.719767 -0.694216 115.256 77.3257)"
        fill="#EAEAEA"
      />
      <path
        d="M68 66.022L85.2586 49.9712M85.2586 49.9712L93.403 49.9712L101.935 49.9712M85.2586 49.9712L101.935 49.9712M101.935 49.9712L119 66.022"
        stroke="#EAEAEA"
      />
      <rect
        width="1.01213"
        height="6.9509"
        transform="matrix(-1 8.51775e-08 8.97273e-08 1 93.6964 39)"
        fill="#EAEAEA"
      />
      <rect
        width="1.00874"
        height="6.99278"
        transform="matrix(-0.880299 0.474419 0.4853 0.874348 81.1869 40.9951)"
        fill="#EAEAEA"
      />
      <rect
        width="1.00874"
        height="6.99278"
        transform="matrix(0.880299 0.474419 -0.4853 0.874348 106.863 40.9951)"
        fill="#EAEAEA"
      />
      <rect
        width="1.0046"
        height="7.04404"
        transform="matrix(-0.704739 0.709467 0.719767 0.694216 72.7958 46.6743)"
        fill="#EAEAEA"
      />
      <rect
        width="1.0046"
        height="7.04404"
        transform="matrix(0.704739 0.709466 -0.719767 0.694216 115.256 46.6743)"
        fill="#EAEAEA"
      />

      <path d="M79 156L79 168.441L70.2593 178L62.4074 178L62.4074 172.234L55 165.407L55 156L59.4444 156L62.4074 156L72.037 156L74.7037 156L79 156Z" />
      <path
        d="M79 168.441L79 156L74.7037 156M79 168.441L70.2593 178L62.4074 178M79 168.441L74.7037 164.041L74.7037 156M62.4074 178L62.4074 172.234L55 165.407M62.4074 178L66.8519 173.448L66.8519 166.772L62.4074 156M55 165.407L55 156L59.4444 156M55 165.407L59.4444 160.552L59.4444 156M62.4074 156L59.4444 156M62.4074 156L72.037 156L74.7037 156"
        stroke="#EAEAEA"
        strokeWidth="0.781893"
      />

      <welcome.Marker
        transform="translate(87 55)"
        status={levels.welcome?.status}
        onClick={() => onLevelClick(welcome)}
        focused={targetLevel?.level === welcome}
        level={welcome}
      />
      <combat.Marker
        transform="translate(45 27)"
        status={levels.combat?.status}
        onClick={() => onLevelClick(combat)}
        focused={targetLevel?.level === combat}
        level={combat}
      />
      <skills.Marker
        transform="translate(86 10)"
        status={levels.skills?.status}
        onClick={() => onLevelClick(skills)}
        focused={targetLevel?.level === skills}
        level={skills}
      />
      <teamwork.Marker
        transform="translate(129 27)"
        status={levels.teamwork?.status}
        onClick={() => onLevelClick(teamwork)}
        focused={targetLevel?.level === teamwork}
        level={teamwork}
      />
      <objectives.Marker
        transform="translate(129 87)"
        status={levels.objectives?.status}
        onClick={() => onLevelClick(objectives)}
        focused={targetLevel?.level === objectives}
        level={objectives}
      />
      <epic.Marker
        transform="translate(86 102)"
        status={levels.epic?.status}
        onClick={() => onLevelClick(epic)}
        focused={targetLevel?.level === epic}
        level={epic}
      />
      <special.Marker
        transform="translate(45 87)"
        status={levels.special?.status}
        onClick={() => onLevelClick(special)}
        focused={targetLevel?.level === special}
        level={special}
      />
    </IslandSVG>
  );
};

export default HubIsland;
