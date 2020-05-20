import { FC } from 'react';
import { IslandProps } from '../utils';
import IslandSVG from '../IslandSVG';
import {
  combat1,
  combat2,
  combat3,
  combat4,
  combat5,
  combat6,
  combat7,
  combat8,
} from './levels';
import { useAccount } from '../../../contexts/account';

const CombatIsland: FC<IslandProps> = ({
  targetLevel,
  onLevelClick,
  ...svgProps
}) => {
  const { account } = useAccount();
  const status =
    account?.islands.find((accountIsland) => accountIsland.name === 'combat')
      ?.status || 'closed';
  const levels =
    account?.levels.filter(
      (accountLevel) => accountLevel.island === 'combat'
    ) || [];

  return (
    <IslandSVG
      width="235"
      height="250"
      viewBox="0 0 235 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      status={status}
      {...svgProps}
    >
      <path
        d="M234.004 127.593V86.1562L204.763 56.3589H164.149L126.785 81.0347H49.736L1.00005 127.593V182.997L13.068 195.801L23.2793 202.785L49.736 221.873H66.4454L74.5681 216.054L121.679 237.238L136.3 244.221L146.28 237.238H176.217L184.572 228.159L194.087 221.873L208.708 207.906V161.348L234.004 127.593Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M234.004 111.937V70.5004L204.763 40.7031H164.149L126.785 65.379H49.736L1.00005 111.937V167.342L13.068 180.145L23.2793 187.129L49.736 206.218H66.4454L74.5681 200.398L121.679 221.582L136.3 228.566L146.28 221.582H176.217L184.572 212.503L194.087 206.218L208.708 192.25V145.692L234.004 111.937Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M73 53.7838H46V48.8693H50.6098V44.6828H55.2195V41.7705H63.9451V44.6828H68.2256V48.8693H73V53.7838Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M42 103.839V96.8003L52.4366 85.8193L61 95.674V103.839H42Z"
        fill="#2B2A30"
      />
      <path
        d="M42 103.839V96.8003L52.4366 85.8193M42 103.839L52.9718 95.674L52.4366 85.8193M42 103.839H61V95.674L52.4366 85.8193"
        stroke="#EAEAEA"
      />
      <path
        d="M194 126.865V120.999L202.789 111.848L210 120.06V126.865H194Z"
        fill="#2B2A30"
      />
      <path
        d="M194 126.865V120.999L202.789 111.848M194 126.865L203.239 120.06L202.789 111.848M194 126.865H210V120.06L202.789 111.848"
        stroke="#EAEAEA"
      />
      <path
        d="M216 126.865V122.954L209.958 116.854L205 122.328V126.865H216Z"
        fill="#2B2A30"
      />
      <path
        d="M216 126.865V122.954L209.958 116.854M216 126.865L209.648 122.328L209.958 116.854M216 126.865H205V122.328L209.958 116.854"
        stroke="#EAEAEA"
      />
      <path
        d="M9 147.888L14.12 136.634L22.056 130.869L36.136 134.438L41 147.888H16.936H9Z"
        fill="#2B2A30"
      />
      <path
        d="M22.056 130.869L14.12 136.634L9 147.888H16.936M22.056 130.869L36.136 134.438L41 147.888H16.936M22.056 130.869L27.688 139.379L19.752 141.849L16.936 147.888"
        stroke="#EAEAEA"
      />
      <path
        d="M146 209.957L140.72 199.364L132.536 193.939L118.016 197.298L113 209.957H137.816H146Z"
        fill="#2B2A30"
      />
      <path
        d="M132.536 193.939L140.72 199.364L146 209.957H137.816M132.536 193.939L118.016 197.298L113 209.957H137.816M132.536 193.939L126.728 201.948L134.912 204.273L137.816 209.957"
        stroke="#EAEAEA"
      />
      <path
        d="M27 147.888L28.3636 139.879H35.1818L39 147.888H37.3636H27Z"
        fill="#2B2A30"
      />
      <path
        d="M35.1818 139.879H28.3636L27 147.888H37.3636M35.1818 139.879L39 147.888H37.3636M35.1818 139.879L34.6364 141.362M34.6364 141.362L37.3636 147.888M34.6364 141.362H28.3636"
        stroke="#EAEAEA"
      />
      <path
        d="M128 209.957L126.636 202.949H119.818L116 209.957H117.636H128Z"
        fill="#2B2A30"
      />
      <path
        d="M119.818 202.949H126.636L128 209.957H117.636M119.818 202.949L116 209.957H117.636M119.818 202.949L120.364 204.247M120.364 204.247L117.636 209.957M120.364 204.247H126.636"
        stroke="#EAEAEA"
      />
      <path
        d="M51.8797 158.119H72.62V149.526L49 103.839H59.7507L81 144.078V166.391H64.1883V218.017L61.4521 221.97H51.8797V158.119Z"
        fill={status === 'done' ? '#FF9330' : '#26252b'}
      />
      <path
        d="M61.4521 221.97H51.8797V158.119H72.62V149.526L49 103.839H59.7507L81 144.078V166.391H64.1883M61.4521 221.97V166.391H64.1883M61.4521 221.97L64.1883 218.017V166.391"
        stroke="#EAEAEA"
      />
      <rect
        x="61.5"
        y="166.408"
        width="3"
        height="59.0666"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M212.547 21.9175H204.752H200.075V30.8365H194.878V35.933H227.878V31.8558H222.421V28.2882H212.547V21.9175Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M198.13 11.7373H171.783L159 73.8061H186H213L198.13 11.7373Z"
        fill="#2B2A30"
      />
      <path
        d="M186.913 15.6657C186.078 15.6657 182.565 15.6657 180.913 15.6657V27.7128L185.87 34.2601L186 73.8061M186 73.8061H213L198.13 11.7373H171.783L159 73.8061H186Z"
        stroke="#EAEAEA"
      />
      <path
        d="M183.057 8.73389L181 11.8573H187.429V28.5158L192.829 33.4613L194.371 45.9551L199 50.6403L200.8 59.7504L196.943 65.9973L185.114 68.6002L183.057 73.806H202.857L208 64.1753L205.943 52.4623L199 42.5714V37.3656L192.829 25.9129V14.1999L195.143 11.8573L192.829 8.73389H183.057Z"
        fill={status === 'done' ? '#FF9330' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M177.479 5.73047L175 11.7371H191L186.042 5.73047H177.479Z"
        fill={status === 'done' ? '#FF9330' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M70 226.976H43V222.471H47.6098V218.633H52.2195V215.964H60.9451V218.633H65.2256V222.471H70V226.976Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M90.2915 119.165L92.6288 113.965H96.7841H100.939L106.133 119.165H98.2124H90.2915Z"
        fill="#2B2A30"
      />
      <path
        d="M96.7841 113.965H92.6288L90.2915 119.165H98.2124M96.7841 113.965H100.939L106.133 119.165H98.2124M96.7841 113.965L98.2124 119.165"
        stroke="#EAEAEA"
      />
      <path
        d="M71 84.818L68.9344 79.8125H65.2623H61.5902L57 84.818H64H71Z"
        fill="#2B2A30"
      />
      <path
        d="M65.2623 79.8125H68.9344L71 84.818H64M65.2623 79.8125H61.5902L57 84.818H64M65.2623 79.8125L64 84.818"
        stroke="#EAEAEA"
      />
      <path
        d="M75.5 118.355V103.839L87.1171 93.8281H107.8L123.829 110.116H158.215L182 134.022V249H160.541V139.276L150.459 128.505H128.483L122.02 136.387H94.5L75.5 118.355Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M79 105.598V121.359L94.5 136.375H122L128.5 128.366H150.5L160.5 138.878V236.486H176.5L177 138.878L156.5 116.854H122.164L103.447 97.8325H88.4748L79 105.598Z"
        fill={status === 'done' ? '#FF9330' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M178 37.9769V43.7728H148V41.6652H150.655V37.9769H159.681V33.7617H171.363V37.9769H178Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M108 120.858L105.639 115.853H101.443H97.2459L92 120.858H100H108Z"
        fill="#2B2A30"
      />
      <path
        d="M101.443 115.853H105.639L108 120.858H100M101.443 115.853H97.2459L92 120.858H100M101.443 115.853L100 120.858"
        stroke="#EAEAEA"
      />
      <path
        d="M134 75.8081L141.692 59.3561H154V53.7837H163.744L174 75.8081H147.59H141.692H134Z"
        fill="#2B2A30"
      />
      <path
        d="M141.692 59.3561L134 75.8081H141.692M141.692 59.3561H154V53.7837H163.744M141.692 59.3561L147.59 64.9286L141.692 75.8081M163.744 53.7837L174 75.8081H147.59M163.744 53.7837L160.154 64.9286H152.718L147.59 75.8081M147.59 75.8081H141.692"
        stroke="#EAEAEA"
      />
      <path
        d="M194 249H151V242.038H158.341V236.107H165.683V231.981H179.579V236.107H186.396V242.038H194V249Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M180.133 63.7949H165.592L161 75.8082H186L180.133 63.7949Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M182 91.8257L187.816 80.9461H195.747L201.034 69.8013H211.609L217.425 80.9461H222.184L222.257 81.0822L228 91.8257H219.54H182Z"
        fill="#2B2A30"
      />
      <path
        d="M201.034 69.8013L195.747 80.9461H187.816L182 91.8257H219.54M201.034 69.8013H211.609L217.425 80.9461M201.034 69.8013L211.609 86.5186L217.425 80.9461M217.425 80.9461H222.184L222.257 81.0822M222.257 81.0822L228 91.8257H219.54M222.257 81.0822L216.897 86.5186L219.54 91.8257"
        stroke="#EAEAEA"
      />
      <path
        d="M77 80.8138V58.7341L92.2963 41.7705H106.037V52.0025L119 64.1194V80.8138H111.222H106.037H89.1852H84.5185H77Z"
        fill="#2B2A30"
      />
      <path
        d="M77 58.7341V80.8138H84.5185M77 58.7341L92.2963 41.7705H106.037M77 58.7341L84.5185 66.5428V80.8138M106.037 41.7705V52.0025L119 64.1194M106.037 41.7705L98.2593 49.8484V61.696L106.037 69.2354M119 64.1194V80.8138H111.222M119 64.1194L111.222 72.7359V80.8138M106.037 69.2354V80.8138M106.037 69.2354L100.852 75.1592H93.0741L89.1852 80.8138M106.037 80.8138H111.222M106.037 80.8138H89.1852M84.5185 80.8138H89.1852"
        stroke="#EAEAEA"
      />
      <path
        d="M46.1806 97.8325L50.6774 103.217L52 104.498V118.856H35.9968H19.9935H11L18.9355 103.217H24.2258L30.3097 97.8325H46.1806Z"
        fill="#2B2A30"
      />
      <path
        d="M46.1806 97.8325L50.6774 103.217L52 104.498V118.856H35.9968M46.1806 97.8325H30.3097L24.2258 103.217M46.1806 97.8325L35.9968 106.549V118.856M24.2258 103.217H18.9355M24.2258 103.217L25.0194 108.601M18.9355 103.217L11 118.856H19.9935M18.9355 103.217L25.0194 108.601M25.0194 108.601L19.9935 118.856M19.9935 118.856H35.9968"
        stroke="#EAEAEA"
      />
      <path
        d="M107 180.58V167.532L110.552 161.903H135.925L141 167.532V184.929H110.552L107 180.58Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M141 172.916L135.418 167.91H107V180.674L110.806 184.929H141V172.916Z"
        fill={status === 'done' ? '#FF9330' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="170.357"
        y="0.5"
        width="1.59702"
        height="1.5999"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M128 57.7881H101V53.2831H105.61V49.4455H110.22V46.7759H118.945V49.4455H123.226V53.2831H128V57.7881Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <rect
        x="194.04"
        y="3.51553"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="201.312"
        y="7.15469"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="173.374"
        y="6.65176"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="195.078"
        y="18.5946"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="108.341"
        y="101.355"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="171.186"
        y="151.273"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="171.838"
        y="158.507"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="145.5"
        y="159.4"
        width="2"
        height="2.00333"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <rect
        x="132.25"
        y="178.171"
        width="0.5"
        height="0.501109"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.5"
      />
      <rect
        x="77.1765"
        y="208.471"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="104.599"
        y="109.976"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="65.5047"
        y="213.301"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="46.7393"
        y="211.735"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="46.5331"
        y="199.111"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="56.122"
        y="171.031"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="76.4512"
        y="149.114"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="68.6322"
        y="161.638"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="56.122"
        y="163.204"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="54.6686"
        y="149.224"
        width="2.63583"
        height="2.63986"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <rect
        x="62.3771"
        y="152.245"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="49.8668"
        y="153.81"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="6.53897"
        y="185.072"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="39.5"
        y="205.17"
        width="2.63583"
        height="2.63986"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <rect
        x="172.25"
        y="106.091"
        width="0.5"
        height="0.501109"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.5"
      />
      <rect
        x="174.5"
        y="112.348"
        width="3"
        height="3.00444"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <rect
        x="112.5"
        y="89.3228"
        width="2"
        height="2.00333"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <rect
        x="75.5"
        y="97.3315"
        width="2"
        height="2.00333"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <rect
        x="92.25"
        y="89.0728"
        width="0.5"
        height="0.501109"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.5"
      />
      <rect
        x="76.1381"
        y="127.354"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="98.25"
        y="109.095"
        width="0.5"
        height="0.501109"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.5"
      />
      <rect
        x="183.652"
        y="57.5932"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />
      <rect
        x="190.923"
        y="60.1928"
        width="0.779106"
        height="0.780834"
        fill="#2B2A30"
        stroke="#EAEAEA"
        strokeWidth="0.779106"
      />

      <line
        x1="164"
        y1="98.7136"
        x2="140"
        y2="98.7136"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path
        d="M137 137.214L132.5 108.714"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path
        d="M130 148.214L115 151.714"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path
        d="M90 178.214L100 162.714"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path d="M76 185.714L35 171.214" stroke="#EAEAEA" strokeDasharray="2 2" />
      <path
        d="M33.5 148.214L28 159.214"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />
      <path d="M44 134.714L38 140.214" stroke="#EAEAEA" strokeDasharray="2 2" />
      <path
        d="M211.001 105.213L182 100.714"
        stroke="#EAEAEA"
        strokeDasharray="2 2"
      />

      <combat1.Marker
        transform="translate(213 99)"
        status={levels.find((level) => level.name === 'combat1')?.status}
        onClick={() => onLevelClick(combat1)}
        focused={targetLevel?.level === combat1}
        level={combat1}
      />
      <combat2.Marker
        transform="translate(167 92)"
        status={levels.find((level) => level.name === 'combat2')?.status}
        onClick={() => onLevelClick(combat2)}
        focused={targetLevel?.level === combat2}
        level={combat2}
      />
      <combat3.Marker
        transform="translate(124 92)"
        status={levels.find((level) => level.name === 'combat3')?.status}
        onClick={() => onLevelClick(combat3)}
        focused={targetLevel?.level === combat3}
        level={combat3}
      />
      <combat4.Marker
        transform="translate(132 139)"
        status={levels.find((level) => level.name === 'combat4')?.status}
        onClick={() => onLevelClick(combat4)}
        focused={targetLevel?.level === combat4}
        level={combat4}
      />
      <combat5.Marker
        transform="translate(99 149)"
        status={levels.find((level) => level.name === 'combat5')?.status}
        onClick={() => onLevelClick(combat5)}
        focused={targetLevel?.level === combat5}
        level={combat5}
      />
      <combat6.Marker
        transform="translate(78 180)"
        status={levels.find((level) => level.name === 'combat6')?.status}
        onClick={() => onLevelClick(combat6)}
        focused={targetLevel?.level === combat6}
        level={combat6}
      />
      <combat7.Marker
        transform="translate(19 161)"
        status={levels.find((level) => level.name === 'combat7')?.status}
        onClick={() => onLevelClick(combat7)}
        focused={targetLevel?.level === combat7}
        level={combat7}
      />
      <combat8.Marker
        transform="translate(43 123)"
        status={levels.find((level) => level.name === 'combat8')?.status}
        onClick={() => onLevelClick(combat8)}
        focused={targetLevel?.level === combat8}
        level={combat8}
      />
    </IslandSVG>
  );
};

export default CombatIsland;
