import { FC } from 'react';
import { IslandProps } from '../utils';
import IslandSVG from '../IslandSVG';
import { special1, special2, special3, special4 } from './levels';
import { useAccount } from '../../../contexts/account';

const SpecialIsland: FC<IslandProps> = ({
  targetLevel,
  onLevelClick,
  ...svgProps
}) => {
  const { account } = useAccount();
  const status =
    account?.islands.find((accountIsland) => accountIsland.name === 'special')
      ?.status || 'closed';
  const levels =
    account?.levels.filter(
      (accountLevel) => accountLevel.island === 'special'
    ) || [];

  return (
    <IslandSVG
      width="235"
      height="246"
      viewBox="0 0 235 246"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      status={status}
      {...svgProps}
    >
      <path
        d="M234.004 173.976L234.004 215.291L204.763 245L164.149 245L126.785 220.397L49.736 220.397L1.00005 173.976L1.00006 118.735L13.068 105.969L23.2793 99.0063L49.736 79.9738L66.4454 79.9738L74.5681 85.7764L121.679 64.6549L136.3 57.6917L146.28 64.6549L176.217 64.6549L184.572 73.707L194.087 73.707L194.087 79.9738L208.708 93.9L208.708 140.321L234.004 173.976Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M234.004 158.368L234.004 199.682L204.763 229.392L164.149 229.392L126.785 204.789L49.736 204.789L1.00005 158.368L1.00006 103.127L13.068 90.361L23.2793 83.3979L49.736 64.3653L66.4454 64.3653L74.5681 70.168L121.679 49.0465L136.3 42.0833L146.28 49.0465L176.217 49.0465L184.572 58.0985L188.5 60.3889L194.087 64.3654L208.708 78.2916L208.708 124.713L234.004 158.368Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path d="M192 96L197 134" stroke="#EAEAEA" strokeDasharray="2 2" />
      <path d="M193 151L159 181" stroke="#EAEAEA" strokeDasharray="2 2" />
      <path d="M141 186L69.5 176" stroke="#EAEAEA" strokeDasharray="2 2" />
      <path
        d="M45.5 14.0393L61 4.01132L77.5 1.00293L94.5 4.51272L109.5 15.0421L119.5 28.0785L122.5 46.1289L119.5 64.1792L109.5 78.7198L95 88.7478L77.5 92.2576L60 88.7478L45.5 78.7198L35.5 64.1792L32.5 47.1317L35.5 29.0813L45.5 14.0393Z"
        fill="#2B2A30"
      />
      <path
        d="M61 4.01133L45.5 14.0393M61 4.01133L77.5 1.00293L94.5 4.51272M61 4.01133L64.259 12.1337M45.5 14.0393L35.5 29.0813M45.5 14.0393L52 20.6084M35.5 29.0813L32.5 47.1317M35.5 29.0813L44 32.6329M32.5 47.1317L35.5 64.1792M32.5 47.1317L42 47.0258M35.5 64.1792L45.5 78.7198M35.5 64.1792L44.5938 60.271M45.5 78.7198L60 88.7478M45.5 78.7198L52 72.2525M60 88.7478L77.5 92.2576M60 88.7478L63.6964 79.7226M77.5 92.2576L95 88.7478M77.5 92.2576V82.2296M95 88.7478L109.5 78.7198M95 88.7478L91.3787 79.7226M109.5 78.7198L119.5 64.1792M109.5 78.7198L103.101 72.2525M119.5 64.1792L122.5 46.1289M119.5 64.1792L111 60.6277M122.5 46.1289L119.5 28.0785M122.5 46.1289L114.5 46.218M119.5 28.0785L109.5 15.0421M119.5 28.0785L111 31.7315M109.5 15.0421L94.5 4.51272M109.5 15.0421L103.906 20.6084M94.5 4.51272L91.3787 12.1337M77.5 1.50433V10.0281M52 20.6084L44 32.6329M52 20.6084L64.259 12.1337M52 20.6084L63.8979 32.6329M44 32.6329L42 47.0258M44 32.6329L52 35.9755M42 47.0258L44.5938 60.271M42 47.0258L56.5 46.8642M44.5938 60.271L52 72.2525M44.5938 60.271L53 56.6582M52 72.2525L63.6964 79.7226M52 72.2525L63 61.3079M63.6964 79.7226L77.5 82.2296M63.6964 79.7226L67.1875 71.1988M77.5 82.2296L91.3787 79.7226M77.5 82.2296V67.689M91.3787 79.7226L103.101 72.2525M91.3787 79.7226L87.9586 71.1988M103.101 72.2525L111 60.6277M103.101 72.2525L92.2713 61.3079M111 60.6277L114.5 46.218M111 60.6277L103.101 57.3271M114.5 46.218L111 31.7315M114.5 46.218L99.5 46.3851M111 31.7315L103.906 20.6084M111 31.7315L103.101 35.1264M103.906 20.6084L91.3787 12.1337M103.906 20.6084L92.7261 31.7315M91.3787 12.1337L77.5 10.0281M91.3787 12.1337L87.9586 20.4842M77.5 10.0281L64.259 12.1337M77.5 10.0281V26.0729M64.259 12.1337L67.6595 20.6084M67.6595 20.6084L63.8979 32.6329M67.6595 20.6084L87.9586 71.1988M67.6595 20.6084L77.5 26.0729M63.8979 32.6329L52 35.9755M63.8979 32.6329L92.2713 61.3079M52 35.9755L56.5 46.8642M52 35.9755L102 56.8672M56.5 46.8642L53 56.6582M56.5 46.8642L99.5 46.3851M53 56.6582L63 61.3079M53 56.6582L103.101 35.1264M63 61.3079L67.1875 71.1988M63 61.3079L92.7261 31.7315M67.1875 71.1988L77.5 67.689M67.1875 71.1988L87.9586 20.4842M77.5 67.689L87.9586 71.1988M77.5 67.689V26.0729M87.9586 71.1988L92.2713 61.3079M92.2713 61.3079L102 56.8672M102 56.8672L103.101 57.3271M103.101 57.3271L99.5 46.3851M99.5 46.3851L103.101 35.1264M103.906 35.9755L92.7261 31.7315M92.7261 31.7315L87.9586 20.4842M87.9586 20.4842L77.5 26.0729"
        stroke="#EAEAEA"
      />
      <rect
        x="28.5"
        y="46.6289"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint0_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M78 48.6357L92.5 100.781H97L79.5 48.6357H78ZM78 48.6357H76L59 100.781H63.5L78 48.6357ZM48.5 100.781H107.5V103.288L111.5 107.801H43.5L48.5 103.288V100.781Z"
        stroke="#EAEAEA"
      />
      <rect
        x="74.5"
        y="0.5"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint1_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="92.5"
        y="4.51074"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint2_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="107.5"
        y="14.5391"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint3_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="117.5"
        y="26.5732"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint4_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="119.5"
        y="45.626"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint5_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="116.5"
        y="63.6758"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint6_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="106.5"
        y="78.7188"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint7_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="92.5"
        y="87.7432"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint8_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="74.5"
        y="91.7549"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint9_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="56.5"
        y="88.7461"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint10_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="41.5"
        y="78.7188"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint11_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="31.5"
        y="63.6758"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint12_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="32.5"
        y="28.5781"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint13_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="43.5"
        y="13.5361"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint14_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="58.5"
        y="3.50879"
        width="6"
        height="4.01399"
        fill={status === 'done' ? 'url(#paint15_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M95.5 106.803L131 81.3499L131.5 77.8563H133V67.3757V60.8877L140.5 65.3794L133 67.3757V77.8563H134.5L135.5 81.3499L170.5 106.304L177.5 122.274H168H156H144H133H122.5H111H99H89L95.5 106.803Z"
        fill="#2B2A30"
      />
      <path
        d="M95.5 106.803L131 81.3499L131.5 77.8563H133M95.5 106.803L89 122.274H99M95.5 106.803L98.5 109.797L106 106.803M95.5 106.803L133 106.553M170.5 106.304L177.5 122.274H168M170.5 106.304L135.5 81.3499L134.5 77.8563H133M170.5 106.304L133 106.553M170.5 106.304L168 109.797L160.5 106.304L157.5 110.296L150 106.44M99 122.274L106 106.803M99 122.274H111M106 106.803L132 81.849H133M106 106.803L109.5 110.795L116 106.803M133 81.849L116 106.803M133 81.849L125 106.607M116 106.803L111 122.274M116 106.803L120 110.795L125 106.607M111 122.274H122.5M122.5 122.274L125 106.607M122.5 122.274H133M125 106.607L128.5 110.795L133 106.553M134 81.849L133 106.553M134 81.849L141.5 106.497M134 81.849L150 106.44M133 106.553V122.274M133 106.553L137.5 110.296L141.5 106.497M133 122.274H144M144 122.274L141.5 106.497M144 122.274H156M141.5 106.497L146.5 110.795L150 106.44M150 106.44L156 122.274M156 122.274H168M168 122.274L160.5 106.37L134.5 81.849M133 77.8563V67.3757M133 67.3757V60.8877L140.5 65.3794L133 67.3757Z"
        stroke="#EAEAEA"
      />
      <path
        d="M139.903 143.991L141.935 147.868H140.774L142.613 150.872H141.548L143 153.973H137L138.742 150.872H137.581L139.032 147.868H137.968L139.903 143.991Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M25.9032 125.991L27.9355 129.868H26.7742L28.6129 132.872H27.5484L29 135.973H23L24.7419 132.872H23.5806L25.0323 129.868H23.9677L25.9032 125.991Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M207.903 188.963L209.935 192.839H208.774L210.613 195.843H209.548L211 198.944H205L206.742 195.843H205.581L207.032 192.839H205.968L207.903 188.963Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M134.871 139L137.581 144.427H136.032L138.484 148.633H137.065L139 152.974H131L133.323 148.633H131.774L133.71 144.427H132.29L134.871 139Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M20.871 121L23.5806 126.427H22.0323L24.4839 130.633H23.0645L25 134.974H17L19.3226 130.633H17.7742L19.7097 126.427H18.2903L20.871 121Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M201.323 180.978L205.048 188.343H202.919L206.29 194.05H204.339L207 199.943H196L199.194 194.05H197.065L199.726 188.343H197.774L201.323 180.978Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M146 160.46L140.184 149.607H132.253L126.966 139H116.391L110.575 149.607H105.816L105.743 149.736L100 160.46H108.5H146Z"
        fill="#2B2A30"
      />
      <path
        d="M126.966 139L132.253 149.607H140.184L146 160.46H108.5M126.966 139H116.391L110.575 149.607M126.966 139L116.391 154.91L110.575 149.607M110.575 149.607H105.816L105.743 149.736M105.743 149.736L100 160.46H108.5M105.743 149.736L111.103 154.91L108.5 160.46"
        stroke="#EAEAEA"
      />
      <path
        d="M132.903 158.963L134.935 162.839H133.774L135.613 165.843H134.548L136 168.944H130L131.742 165.843H130.581L132.032 162.839H130.968L132.903 158.963Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M127.871 153.973L130.581 159.4H129.032L131.484 163.605H130.065L132 167.947H124L126.323 163.605H124.774L126.71 159.4H125.29L127.871 153.973Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M149.871 145.987L152.581 151.414H151.032L153.484 155.62H152.065L154 159.961H146L148.323 155.62H146.774L148.71 151.414H147.29L149.871 145.987Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M54 142.736V148.226H85.5V142.736H54Z"
        fill={status === 'done' ? 'url(#paint16_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M69 101.812H71.5V105.805L85.5 117.783V122.275H54V117.783L69 105.805V101.812Z"
        fill={status === 'done' ? 'url(#paint17_linear)' : '#26252b'}
      />
      <path
        d="M71.5 105.805V101.812H69V105.805M71.5 105.805L85.5 117.783M71.5 105.805H69.5M85.5 117.783V122.275H54V117.783M85.5 117.783H83M54 117.783L69 105.805M54 117.783H57M69 105.805H69.5M69.5 105.805L57 117.783M69.5 105.805L61 117.783M57 117.783H61M61 117.783H65.75M70.5 105.805V117.783M70.5 117.783H77.5M70.5 117.783H65.75M83 117.783L71 105.805L77.5 117.783M83 117.783H77.5M70 105.805L65.75 117.783"
        stroke="#EAEAEA"
      />
      <path
        d="M54.5 131.258L57 132.256H60.5L62 131.757L62.5 130.26L63 128.763L64.5 128.264L66.5 126.767L65.5 128.763C65.6667 128.929 66.1 129.262 66.5 129.262C66.9 129.262 67.6667 129.595 68 129.761V130.759L67.5 131.757L66 131.258V132.256V133.754L66.5 135.75L64.5 137.247L62.5 138.245L64 135.75H63H60.5L59.5 136.748L57.5 137.746L54.5 139.244L54 138.744L57 136.249V134.253L55.5 135.75L53 134.253H55L54.5 131.258Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M74 131.258L76.5 132.256H80L81.5 131.757L82 130.26L82.5 128.763L84 128.264L86 126.767L85 128.763C85.1667 128.929 85.6 129.262 86 129.262C86.4 129.262 87.1667 129.595 87.5 129.761V130.759L87 131.757L85.5 131.258V132.256V133.754L86 135.75L84 137.247L82 138.245L83.5 135.75H82.5H80L79 136.748L77 137.746L74 139.244L73.5 138.744L76.5 136.249V134.253L75 135.75L72.5 134.253H74.5L74 131.258Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M60.5 132.256V122.773V122.274H61.5V132.256H60.5Z"
        fill="#2B2A30"
      />
      <path d="M61.5 142.238V136.249H60.5V142.238H61.5Z" fill="#2B2A30" />
      <path
        d="M60.5 132.256V122.773V122.274H61.5V132.256H60.5Z"
        stroke="#EAEAEA"
      />
      <path d="M61.5 142.238V136.249H60.5V142.238H61.5Z" stroke="#EAEAEA" />
      <path
        d="M79.5 132.256V122.773V122.274H80.5V132.256H79.5Z"
        fill="#2B2A30"
      />
      <path d="M80.5 142.238V136.249H79.5V142.238H80.5Z" fill="#2B2A30" />
      <path
        d="M79.5 132.256V122.773V122.274H80.5V132.256H79.5Z"
        stroke="#EAEAEA"
      />
      <path d="M80.5 142.238V136.249H79.5V142.238H80.5Z" stroke="#EAEAEA" />
      <rect
        x="70.3284"
        y="95.5323"
        width="2.99631"
        height="2.99631"
        transform="rotate(45 70.3284 95.5323)"
        fill={status === 'done' ? 'url(#paint18_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="150.5"
        y="78.3564"
        width="5"
        height="4.98894"
        fill={status === 'done' ? 'url(#paint19_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="154.5"
        y="74.3643"
        width="5"
        height="4.98894"
        fill={status === 'done' ? 'url(#paint20_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="155.5"
        y="80.3525"
        width="5"
        height="4.98894"
        fill={status === 'done' ? 'url(#paint21_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="148.5"
        y="42.4229"
        width="5"
        height="4.98894"
        fill={status === 'done' ? 'url(#paint22_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="125.5"
        y="6.48926"
        width="5"
        height="4.98894"
        fill={status === 'done' ? 'url(#paint23_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path d="M151 46.9141V57.8938" stroke="#EAEAEA" />
      <path d="M128 10.9805V21.9602" stroke="#EAEAEA" />
      <rect
        x="150.5"
        y="73.3662"
        width="5"
        height="4.98894"
        fill={status === 'done' ? 'url(#paint24_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="154.5"
        y="68.375"
        width="5"
        height="4.98894"
        fill={status === 'done' ? 'url(#paint25_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="159.5"
        y="70.3711"
        width="6"
        height="5.98709"
        fill={status === 'done' ? 'url(#paint26_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="163.5"
        y="78.3564"
        width="6"
        height="5.98709"
        fill={status === 'done' ? 'url(#paint27_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <path
        d="M158 85.8415L159 97.3203M159 97.3203L162 76M159 97.3203L166.5 84.5M159 97.3203L155.5 85.5M159 97.3203L152.5 83.5M159 97.3203L164.5 84.5"
        stroke="#EAEAEA"
      />
      <rect
        x="159.5"
        y="82.3496"
        width="4"
        height="3.99078"
        fill={status === 'done' ? 'url(#paint28_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect
        x="164.5"
        y="75.3623"
        width="4"
        height="3.99078"
        fill={status === 'done' ? 'url(#paint29_linear)' : '#26252b'}
        stroke="#EAEAEA"
      />
      <rect x="201" y="169" width="8" height="0.998156" fill="#EAEAEA" />
      <rect x="205" y="173.991" width="8" height="0.998156" fill="#EAEAEA" />
      <rect x="174" y="191" width="8" height="0.998156" fill="#EAEAEA" />
      <rect x="180" y="215.992" width="8" height="0.998156" fill="#EAEAEA" />
      <rect x="170" y="212" width="8" height="0.998156" fill="#EAEAEA" />
      <rect x="19" y="145.954" width="8" height="0.998156" fill="#EAEAEA" />
      <rect x="30" y="139.965" width="8" height="0.998156" fill="#EAEAEA" />
      <rect x="13" y="140.963" width="8" height="0.998156" fill="#EAEAEA" />
      <special1.Marker
        transform="translate(183 80)"
        status={levels.find((level) => level.name === 'special1')?.status}
        onClick={() => onLevelClick(special1)}
        focused={targetLevel?.level === special1}
        level={special1}
      />
      <special2.Marker
        transform="translate(191 136)"
        status={levels.find((level) => level.name === 'special2')?.status}
        onClick={() => onLevelClick(special2)}
        focused={targetLevel?.level === special2}
        level={special2}
      />
      <special3.Marker
        transform="translate(145 178)"
        status={levels.find((level) => level.name === 'special3')?.status}
        onClick={() => onLevelClick(special3)}
        focused={targetLevel?.level === special3}
        level={special3}
      />
      <special4.Marker
        transform="translate(54 165)"
        status={levels.find((level) => level.name === 'special4')?.status}
        onClick={() => onLevelClick(special4)}
        focused={targetLevel?.level === special4}
        level={special4}
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="27.8542"
          y1="46.1289"
          x2="33.4776"
          y2="53.3397"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="73.8542"
          y1="-3.33922e-08"
          x2="79.4776"
          y2="7.21082"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="91.8542"
          y1="4.01074"
          x2="97.4776"
          y2="11.2216"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="106.854"
          y1="14.0391"
          x2="112.478"
          y2="21.2499"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint4_linear"
          x1="116.854"
          y1="26.0732"
          x2="122.478"
          y2="33.2841"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint5_linear"
          x1="118.854"
          y1="45.126"
          x2="124.478"
          y2="52.3368"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint6_linear"
          x1="115.854"
          y1="63.1758"
          x2="121.478"
          y2="70.3866"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint7_linear"
          x1="105.854"
          y1="78.2187"
          x2="111.478"
          y2="85.4296"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint8_linear"
          x1="91.8542"
          y1="87.2432"
          x2="97.4776"
          y2="94.454"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint9_linear"
          x1="73.8542"
          y1="91.2549"
          x2="79.4776"
          y2="98.4657"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint10_linear"
          x1="55.8542"
          y1="88.2461"
          x2="61.4776"
          y2="95.4569"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint11_linear"
          x1="40.8542"
          y1="78.2187"
          x2="46.4776"
          y2="85.4296"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint12_linear"
          x1="30.8542"
          y1="63.1758"
          x2="36.4776"
          y2="70.3866"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint13_linear"
          x1="31.8542"
          y1="28.0781"
          x2="37.4776"
          y2="35.2889"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint14_linear"
          x1="42.8542"
          y1="13.0361"
          x2="48.4776"
          y2="20.2469"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint15_linear"
          x1="57.8542"
          y1="3.00879"
          x2="63.4776"
          y2="10.2196"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint16_linear"
          x1="53.3438"
          y1="142.736"
          x2="55.6692"
          y2="154.992"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint17_linear"
          x1="53.3438"
          y1="101.812"
          x2="75.6543"
          y2="133.358"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint18_linear"
          x1="70.2451"
          y1="94.8252"
          x2="74.8498"
          y2="99.0545"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint19_linear"
          x1="149.875"
          y1="77.8564"
          x2="156.777"
          y2="84.2072"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint20_linear"
          x1="153.875"
          y1="73.8643"
          x2="160.777"
          y2="80.215"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint21_linear"
          x1="154.875"
          y1="79.8525"
          x2="161.777"
          y2="86.2033"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint22_linear"
          x1="147.875"
          y1="41.9229"
          x2="154.777"
          y2="48.2736"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint23_linear"
          x1="124.875"
          y1="5.98926"
          x2="131.777"
          y2="12.34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint24_linear"
          x1="149.875"
          y1="72.8662"
          x2="156.777"
          y2="79.217"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint25_linear"
          x1="153.875"
          y1="67.875"
          x2="160.777"
          y2="74.2258"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint26_linear"
          x1="158.854"
          y1="69.8711"
          x2="166.906"
          y2="77.2803"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint27_linear"
          x1="162.854"
          y1="77.8564"
          x2="170.906"
          y2="85.2657"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint28_linear"
          x1="158.896"
          y1="81.8496"
          x2="164.647"
          y2="87.1419"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint29_linear"
          x1="163.896"
          y1="74.8623"
          x2="169.647"
          y2="80.1546"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint30_linear"
          x1="11.7731"
          y1="3.9993"
          x2="-1.8034"
          y2="1.73655"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint31_linear"
          x1="11.7731"
          y1="3.9993"
          x2="-1.8034"
          y2="1.73655"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint32_linear"
          x1="11.7731"
          y1="3.9993"
          x2="-1.8034"
          y2="1.73655"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
        <linearGradient
          id="paint33_linear"
          x1="11.7731"
          y1="3.9993"
          x2="-1.8034"
          y2="1.73655"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF1ACD" />
          <stop offset="1" stopColor="#EFB31A" />
        </linearGradient>
      </defs>
    </IslandSVG>
  );
};
export default SpecialIsland;
