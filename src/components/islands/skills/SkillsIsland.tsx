import { FC } from 'react';
import { IslandProps } from '../utils';
import IslandSVG from '../IslandSVG';
import { lvl1, lvl2, lvl3, lvl4, lvl5, lvl6 } from './levels';

const SkillsIsland: FC<IslandProps> = ({
  status,
  targetLevel,
  levels,
  onLevelClick,
  ...svgProps
}) => {
  return (
    <IslandSVG
      width="161"
      height="177"
      viewBox="0 0 161 177"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      status={status}
      levels={levels}
      {...svgProps}
    >
      <path
        d="M1 126.989V64.4892L10.0857 51H130.926L160 82.4748V141.827L146.826 154.867V168.806L137.74 176H74.14L58.24 171.504L42.7943 159.363V136.432L1 126.989Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M1 111.597V48.5971L10.0857 35H130.926L160 66.7266V126.554L146.826 139.698V153.748L137.74 161H74.14L58.24 156.468L42.7943 144.23V121.115L1 111.597Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M16 84.5001L26.9999 55.0001"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path d="M41 105L22 98" stroke="#EAEAEA" strokeDasharray="2 2" />
      <path
        d="M61.0001 127L55.0001 114.5"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path d="M95.9999 144.5L75 139" stroke="#EAEAEA" strokeDasharray="2 2" />
      <path d="M132 128L114 143" stroke="#EAEAEA" strokeDasharray="2 2" />
      <path
        d="M80.1466 6.5L85.5001 0.734807L90.8534 6.5H80.1466Z"
        fill={status === 'done' ? '#FBFF2E' : 'none'}
        stroke="#EAEAEA"
      />
      <path
        d="M137 98L134.639 93H130.443H126.246L121 98H129H137Z"
        fill="#2B2A30"
      />
      <path
        d="M130.443 93H134.639L137 98H129M130.443 93H126.246L121 98H129M130.443 93L129 98"
        stroke="#EAEAEA"
      />
      <path
        d="M91 122L93.3607 117H97.5574H101.754L107 122H99H91Z"
        fill="#2B2A30"
      />
      <path
        d="M97.5574 117H93.3607L91 122H99M97.5574 117H101.754L107 122H99M97.5574 117L99 122"
        stroke="#EAEAEA"
      />
      <path
        d="M68.8854 30.6084V11H103.057V30.6084H108.478V41.4757H116.49V51.3981H124.739V62.7379H132.752V73.1327H141V84H30V73.1327H38.4841V62.7379H46.9682V51.3981H54.9809V41.4757H62.758V30.6084H68.8854Z"
        fill="#2B2A30"
      />
      <path
        d="M68.8854 30.6084V11H103.057V30.6084M68.8854 30.6084H103.057M68.8854 30.6084H62.758V41.4757M103.057 30.6084H108.478V41.4757M62.758 41.4757H108.478M62.758 41.4757H54.9809V51.3981M108.478 41.4757H116.49V51.3981M116.49 51.3981H54.9809M116.49 51.3981H124.739V62.7379M54.9809 51.3981H46.9682V62.7379M46.9682 62.7379H124.739M46.9682 62.7379H38.4841V73.1327M124.739 62.7379H132.752V73.1327M132.752 73.1327H38.4841M132.752 73.1327H141V84H30V73.1327H38.4841"
        stroke="#EAEAEA"
      />
      <path
        d="M68.9448 13.5811H85.6019M85.6019 13.5811H102.259M85.6019 13.5811V22.9653"
        stroke="#EAEAEA"
      />
      <path
        d="M30.2345 72.9365L38.6804 83.4938L46.9999 73.5001L54.1644 83.4938L63.4999 73.5001L74.8099 83.4938H95.4553L106 73.5001L115.866 83.4938L123.5 73.5001L133.462 83.4938L140.5 74.5V83.4938H133.462H115.866H95.4553H74.8099H54.1644H38.6804H30.2345V72.9365Z"
        fill={status === 'done' ? '#FBFF2E' : 'none'}
        stroke="#EAEAEA"
      />
      <rect
        x="75.3099"
        y="30.5029"
        width="19.6454"
        height="52.4904"
        fill={status === 'done' ? '#FBFF2E' : 'none'}
        stroke="#EAEAEA"
      />
      <path d="M77 30V84M93 30V84" stroke="#EAEAEA" />
      <path
        d="M79 33.0527H91M79.5637 38.6833H90.9363M79.5637 43.3755H90.9363M79.5637 48.3022H90.9363M79.5637 52.9943H90.9363M79.5637 58.6249H90.9363M79.5637 64.0209H90.9363M79.5637 68.9476H90.9363M79.5637 72.7014H90.9363M79.5637 76.6897H90.9363M79.5637 80.9126H90.9363"
        stroke="#EAEAEA"
      />
      <rect
        x="82.5"
        y="23.5"
        width="6"
        height="7"
        fill={status === 'done' ? '#FBFF2E' : 'none'}
        stroke="#EAEAEA"
      />
      <rect
        x="92.5"
        y="23.5"
        width="7"
        height="7"
        fill={status === 'done' ? '#FBFF2E' : 'none'}
        stroke="#EAEAEA"
      />
      <rect
        x="72.5"
        y="23.5"
        width="6"
        height="7"
        fill={status === 'done' ? '#FBFF2E' : 'none'}
        stroke="#EAEAEA"
      />
      <path
        d="M9.5 65.5L10 74H13V67.5M9.5 65.5H6V59H8V63H9.5M9.5 65.5V63M9.5 63V56H13V65M13 65H14.5V62H16.5V67.5H13M13 65V67.5M12 59V60.5M11 65V66M11.5 70V71"
        stroke="#EAEAEA"
      />
      <path
        d="M135 99L134.5 90.5H131V84H133V88H134.5V81H138V90H139.5V87H141.5V92.5H138V99H135Z"
        fill="#2B2A30"
      />
      <path
        d="M134.5 90.5L135 99H138V92.5M134.5 90.5H131V84H133V88H134.5M134.5 90.5V88M134.5 88V81H138V90M138 90H139.5V87H141.5V92.5H138M138 90V92.5M137 84V85.5M136 90V91M136.5 95V96"
        stroke="#EAEAEA"
      />
      <path
        d="M32.5 86L33 77.5H36.5V71H34.5V75H33V68H29.5V77H28V74H26V79.5H29.5V86H32.5Z"
        fill="#2B2A30"
      />
      <path
        d="M33 77.5L32.5 86H29.5V79.5M33 77.5H36.5V71H34.5V75H33M33 77.5V75M33 75V68H29.5V77M29.5 77H28V74H26V79.5H29.5M29.5 77V79.5M30.5 71V72.5M31.5 77V78M31 82V83"
        stroke="#EAEAEA"
      />
      <rect x="117" y="110" width="8" height="1" fill="#EAEAEA" />
      <rect x="71" y="97" width="8" height="1" fill="#EAEAEA" />
      <rect x="109" y="104" width="8" height="1" fill="#EAEAEA" />
      <rect x="63" y="91" width="8" height="1" fill="#EAEAEA" />

      <lvl1.Marker
        transform="translate(131 115)"
        status={levels.lvl1?.status}
        onClick={() => onLevelClick(lvl1)}
        focused={targetLevel?.level === lvl1}
      />
      <lvl2.Marker
        transform="translate(99 138)"
        status={levels.lvl2?.status}
        onClick={() => onLevelClick(lvl2)}
        focused={targetLevel?.level === lvl2}
      />
      <lvl3.Marker
        transform="translate(59 128)"
        status={levels.lvl3?.status}
        onClick={() => onLevelClick(lvl3)}
        focused={targetLevel?.level === lvl3}
      />
      <lvl4.Marker
        transform="translate(43 100)"
        status={levels.lvl4?.status}
        onClick={() => onLevelClick(lvl4)}
        focused={targetLevel?.level === lvl4}
      />
      <lvl5.Marker
        transform="translate(7 87)"
        status={levels.lvl5?.status}
        onClick={() => onLevelClick(lvl5)}
        focused={targetLevel?.level === lvl5}
      />
      <lvl6.Marker
        transform="translate(23 42)"
        status={levels.lvl6?.status}
        onClick={() => onLevelClick(lvl6)}
        focused={targetLevel?.level === lvl6}
      />
    </IslandSVG>
  );
};

export default SkillsIsland;
