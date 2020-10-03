import { FC } from 'react';
import { IslandProps } from '../utils';
import IslandSVG from '../IslandSVG';
import {
  teamwork1,
  teamwork2,
  teamwork3,
  teamwork4,
  teamwork5,
  teamwork6,
  teamwork7,
  teamwork8,
} from './levels';

const TeamWorkIsland: FC<IslandProps> = ({
  targetLevel,
  onLevelClick,
  status,
  levels,
  ...svgProps
}) => {
  return (
    <IslandSVG
      width="240"
      height="290"
      viewBox="0 0 240 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      status={status}
      {...svgProps}
    >
      <path
        d="M1 169.597V128.24L30.2416 98.5H70.8548L108.219 123.128H185.268L234.004 169.597V224.894L221.936 237.673L211.725 244.643L185.268 263.695H168.559L160.436 257.886L113.325 279.03L98.7039 286L88.7246 279.03H58.7869L50.4321 269.968L40.917 263.695L26.2963 249.755V203.286L1 169.597Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M1 153.972V112.615L30.2416 82.875H70.8548L108.219 107.503H185.268L234.004 153.972V209.269L221.936 222.048L211.725 229.018L185.268 248.07H168.559L160.436 242.261L113.325 263.405L98.7039 270.375L88.7246 263.405H58.7869L50.4321 254.343L40.917 248.07L26.2963 234.13V187.661L1 153.972Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M23.0781 126L33.0781 159"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path
        d="M38.0782 176.5L43.0782 199"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path d="M49.078 216L64.078 234" stroke="#EAEAEA" strokeDasharray="2 2" />
      <path
        d="M79.078 240L100.078 241"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path
        d="M118.078 237L135.078 220"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path
        d="M147.078 211L206.078 185"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path
        d="M203.078 156.5L211.078 172.5"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path
        d="M182.835 71.2969H159.378V67.4616H163.383V64.1946H167.388V61.9219H174.969V64.1946H178.687V67.4616H182.835V71.2969Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M155.831 47L119.078 128.932H199.078L176.729 87.0679L155.831 47Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M155.695 47L146.078 69.7724H152.736L164.201 80.972H173.078L155.695 47Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M148.691 170.868L146.32 176.301H147.675L145.53 180.511H146.772L145.078 184.857H152.078L150.046 180.511H151.401L149.707 176.301H150.949L148.691 170.868Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M81.691 184.856L79.3201 190.289H80.6749L78.5297 194.499H79.7717L78.0781 198.845H85.0781L83.0459 194.499H84.4007L82.7072 190.289H83.9491L81.691 184.856Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M84.1891 64.5H45.0945V58.1079H51.7692V52.6629H58.4439V48.875H71.0781V52.6629H77.2761V58.1079H84.1891V64.5Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M84.4652 187.854L86.8362 193.287H85.4814L87.6265 197.497H86.3846L88.0781 201.843H81.0781L83.1104 197.497H81.7555L83.4491 193.287H82.2072L84.4652 187.854Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M97.596 2L24.0781 141.885H175.078L97.596 2Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M135.524 157.879L152.078 189.853H118.078L135.524 157.879Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M89.3377 36.9989L79.0781 37.4708L97.5781 2L127.078 53.9572L98.1316 28.3394L89.3377 36.9989Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M144.078 64H105.078V57.8636H111.737V52.6364H118.395V49H130.999V52.6364H137.182V57.8636H144.078V64Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M137.727 166.629H140.078L135.712 157.879L128.578 170.868L135.712 164.464L137.727 166.629Z"
        stroke="#EAEAEA"
      />
      <path
        d="M187.433 172.866L179.981 187.611H184.239L177.497 199.039H181.401L176.078 210.835H198.078L191.691 199.039H195.949L190.627 187.611H194.53L187.433 172.866Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M175.433 176.863L167.981 191.608H172.239L165.497 203.036H169.401L164.078 214.832H186.078L179.691 203.036H183.949L178.627 191.608H182.53L175.433 176.863Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M187.433 186.855L179.981 201.601H184.239L177.497 213.028H181.401L176.078 224.824H198.078L191.691 213.028H195.949L190.627 201.601H194.53L187.433 186.855Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M169.152 120.604L161.624 134.932H165.926L159.115 146.036H163.058L157.681 157.497H179.907L173.454 146.036H177.756L172.379 134.932H176.322L169.152 120.604Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M144.207 178.861L141.497 184.294H143.046L140.594 188.504H142.014L140.078 192.85H148.078L145.756 188.504H147.304L145.368 184.294H146.788L144.207 178.861Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M77.2072 192.851L74.4975 198.283H76.0459L73.5943 202.493H75.0136L73.0781 206.839H81.0781L78.7555 202.493H80.3039L78.3684 198.283H79.7878L77.2072 192.851Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M88.9491 195.848L91.6588 201.28H90.1104L92.562 205.49H91.1426L93.0781 209.836H85.0781L87.4007 205.49H85.8523L87.7878 201.28H86.3684L88.9491 195.848Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M139.207 180.86L136.497 185.905H138.046L135.594 189.814H137.014L135.078 193.85H143.078L140.756 189.814H142.304L140.368 185.905H141.788L139.207 180.86Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M72.2072 193.85L69.4975 199.282H71.0459L68.5943 203.492H70.0136L68.0781 207.838H76.0781L73.7555 203.492H75.3039L73.3684 199.282H74.7878L72.2072 193.85Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M93.9491 197.846L96.6588 202.89H95.1104L97.562 206.799H96.1426L98.0781 210.835H90.0781L92.4007 206.799H90.8523L92.7878 202.89H91.3684L93.9491 197.846Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M81.4652 195.848L83.8362 201.28H82.4814L84.6265 205.49H83.3846L85.0781 209.836H78.0781L80.1104 205.49H78.7555L80.4491 201.28H79.2072L81.4652 195.848Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M75.4632 125L46.0781 155.974H103.078L75.4632 125Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M75.5781 125L83.0781 133.993L71.4872 136.99L67.0781 133.993L75.5781 125Z"
        stroke="#EAEAEA"
      />
      <path
        d="M99.2769 130.995L76.0781 155.975H121.078L99.2769 130.995Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M99.2123 130.995L110.578 143.984L99.2123 138.074L90.0781 140.867L99.2123 130.995Z"
        stroke="#EAEAEA"
      />
      <path
        d="M76.7555 145.982L73.0297 152.967H75.1588L71.7878 158.38H73.7394L71.0781 163.968H82.0781L78.8846 158.38H81.0136L78.3523 152.967H80.3039L76.7555 145.982Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M66.7555 146.981L63.0297 153.966H65.1588L61.7878 159.379H63.7394L61.0781 164.967H72.0781L68.8846 159.379H71.0136L68.3523 153.966H70.3039L66.7555 146.981Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M71.7555 148.98L68.0297 155.965H70.1588L66.7878 161.378H68.7394L66.0781 166.966H77.0781L73.8846 161.378H76.0136L73.3523 155.965H75.3039L71.7555 148.98Z"
        fill={status === 'done' ? '#07EF1E' : '#26252b'}
        stroke="#EAEAEA"
      />
      <teamwork1.Marker
        transform="translate(14 110)"
        status={levels.find((level) => level.name === 'teamwork1')?.status}
        onClick={() => onLevelClick(teamwork1)}
        focused={targetLevel?.level === teamwork1}
        level={teamwork1}
      />
      <teamwork2.Marker
        transform="translate(29 159)"
        status={levels.find((level) => level.name === 'teamwork2')?.status}
        onClick={() => onLevelClick(teamwork2)}
        focused={targetLevel?.level === teamwork2}
        level={teamwork2}
      />
      <teamwork3.Marker
        transform="translate(38 201)"
        status={levels.find((level) => level.name === 'teamwork3')?.status}
        onClick={() => onLevelClick(teamwork3)}
        focused={targetLevel?.level === teamwork3}
        level={teamwork3}
      />
      <teamwork4.Marker
        transform="translate(64 232)"
        status={levels.find((level) => level.name === 'teamwork4')?.status}
        onClick={() => onLevelClick(teamwork4)}
        focused={targetLevel?.level === teamwork4}
        level={teamwork4}
      />
      <teamwork5.Marker
        transform="translate(102 232)"
        status={levels.find((level) => level.name === 'teamwork5')?.status}
        onClick={() => onLevelClick(teamwork5)}
        focused={targetLevel?.level === teamwork5}
        level={teamwork5}
      />
      <teamwork6.Marker
        transform="translate(134 206)"
        status={levels.find((level) => level.name === 'teamwork6')?.status}
        onClick={() => onLevelClick(teamwork6)}
        focused={targetLevel?.level === teamwork6}
        level={teamwork6}
      />
      <teamwork7.Marker
        transform="translate(207 172)"
        status={levels.find((level) => level.name === 'teamwork7')?.status}
        onClick={() => onLevelClick(teamwork7)}
        focused={targetLevel?.level === teamwork7}
        level={teamwork7}
      />
      <teamwork8.Marker
        transform="translate(192 142)"
        status={levels.find((level) => level.name === 'teamwork8')?.status}
        onClick={() => onLevelClick(teamwork8)}
        focused={targetLevel?.level === teamwork8}
        level={teamwork8}
      />
    </IslandSVG>
  );
};

export default TeamWorkIsland;
