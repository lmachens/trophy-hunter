import { FC } from 'react';
import { IslandProps } from '../utils';
import IslandSVG from '../IslandSVG';
import { epic1, epic2 } from './levels';

const EpicIsland: FC<IslandProps> = ({
  targetLevel,
  onLevelClick,
  status,
  levels,
  ...svgProps
}) => {
  return (
    <IslandSVG
      width="207"
      height="182"
      viewBox="0 0 207 182"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      status={status}
      {...svgProps}
    >
      <path
        d="M192 131.989L192 69.4892L182.914 56L62.0743 56L33 87.4748L46.1743 139L46.1743 159.867L46.1743 173.806L55.26 181L118.86 181L134.76 176.504L150.206 164.363L150.206 141.432L192 131.989Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M192 115.989L192 53.4892L182.914 40L62.0743 40L33 71.4748L33 130.827L46.1743 143.867L46.1743 160.504L55.26 165L118.86 165L134.76 160.504L150.206 148.363L150.206 125.432L192 115.989Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M95 78L90.5 72M99 74.5L91.5 62M104.5 70.5V58M109.5 74.5L116.5 62M113 78L120 73.5"
        stroke="#EAEAEA"
      />
      <path
        d="M94.5 106.5L89 111M97 111L89 122.5M102 114V126.5M107 110L114 122.5M111 106.5L117.5 111"
        stroke="#EAEAEA"
      />
      <path
        d="M137.572 17.0847C138.914 16.0791 141.698 14.0678 142.101 14.0678L139.082 8.0339L139.585 4.0113L141.094 9.03955L144.113 12.5593L149.145 6.0226L149.648 2L150.654 4.0113L151.157 8.0339L148.642 12.5593L155.182 27.6441L154.176 36.6949L152.667 70.887L147.132 66.8644L138.076 49.7684L147.132 26.6384L145.12 19.096H139.585L135.56 23.1186L135.057 16.0791L136.063 17.0847L137.069 15.5763L137.572 17.0847Z"
        fill="#2B2A30"
      />
      <path
        d="M142.101 14.0678C141.698 14.0678 138.914 16.0791 137.572 17.0847L137.069 15.5763L136.063 17.0847L135.057 16.0791L135.56 23.1186L139.585 19.096H145.12L147.132 26.6384L138.076 49.7684L147.132 66.8644L152.667 70.887L154.176 36.6949L155.182 27.6441L148.642 12.5593M142.101 14.0678L144.113 12.5593M142.101 14.0678L139.082 8.0339L139.585 4.0113L141.094 9.03955L144.113 12.5593M148.642 12.5593H144.113M148.642 12.5593L151.157 8.0339L150.654 4.0113L149.648 2L149.145 6.0226L144.113 12.5593"
        stroke="#EAEAEA"
      />
      <path
        d="M144.616 64.8534L145.12 63.8478L149.648 69.3789L146.126 71.893L138.579 63.8478L135.56 64.8534L136.063 71.893L133.547 68.876L134.05 73.9043L130.528 68.3732L136.063 59.8252L144.616 64.8534Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M130.528 30.1582L136.063 32.1695L143.107 39.7119L139.585 46.2486L132.541 34.6836H128.013L126 40.7175V32.1695L130.528 30.1582Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M135.057 42.7286L136.063 32.1693L139.082 29.1523L144.113 30.6608L205.497 65.8586L202.478 68.8755L205.497 75.4122L194.428 74.9094L192.415 87.9828L180.34 83.9603L171.283 90.9998L163.233 81.4461L158.201 86.9772L140.088 34.1806H138.076L135.057 42.7286Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path d="M143.107 16.0789L145.623 15.0732" stroke="#EAEAEA" />
      <path
        d="M191.912 87.4805L149.648 40.7178M171.786 89.9946L159.711 65.859M157.195 61.8364L147.635 44.2375M157.195 43.2319L187.887 65.3562M206 75.4127L191.409 67.3675"
        stroke="#EAEAEA"
      />
      <path
        d="M148.138 79.9378L152.667 71.8926L155.182 79.9378L151.157 81.9491L145.623 89.4914V83.9604L141.094 89.4914L143.107 79.9378H148.138Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M185.874 46.2489L181.346 51.78L189.396 56.8083L193.925 46.2489L179.837 26.1359L177.824 19.5992L182.352 16.5823L184.365 18.0907L184.868 23.6218L186.881 17.5879L183.359 13.0625L176.315 15.0738L173.296 24.6275L185.874 46.2489Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M74.5285 97L69.0633 99L62.1076 106.5L65.5854 113L72.5411 101.5H77.0127L79 107.5V99L74.5285 97Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M56.0081 82.9322C55.6081 82.9322 52.8417 84.9209 51.5084 85.9153L51.0085 84.4237L50.0085 85.9153L49.0086 84.9209L49.5086 91.8814L53.5083 87.904L58.0079 88.5L56.6424 99.5L52.9896 103.305L54.4894 137.113L59.989 133.136L68.9883 116.232L66.0822 96L62.5075 81.4407L65.0073 76.9661L64.5074 72.9887L63.5075 71L63.0075 74.9774L58.0079 81.4407L55.0081 77.9605L53.5083 72.9887L53.0083 76.9661L56.0081 82.9322Z"
        fill="#2B2A30"
      />
      <path
        d="M56.0081 82.9322C55.6081 82.9322 52.8417 84.9209 51.5084 85.9153L51.0085 84.4237L50.0085 85.9153L49.0086 84.9209L49.5086 91.8814L53.5083 87.904L58.0079 88.5L56.6424 99.5L52.9896 103.305L54.4894 137.113L59.989 133.136L68.9883 116.232L66.0822 96L62.5075 81.4407M56.0081 82.9322L58.0079 81.4407M56.0081 82.9322L53.0083 76.9661L53.5083 72.9887L55.0081 77.9605L58.0079 81.4407M62.5075 81.4407H58.0079M62.5075 81.4407L65.0073 76.9661L64.5074 72.9887L63.5075 71L63.0075 74.9774L58.0079 81.4407"
        stroke="#EAEAEA"
      />
      <path
        d="M62.4888 131.147L61.9888 130.152L57.4892 135.621L60.9889 138.107L68.4883 130.152L71.4881 131.147L70.9881 138.107L73.4879 135.124L72.9879 140.096L76.4877 134.627L70.9881 126.175L62.4888 131.147Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M58.9892 146.062L54.4896 138.107L51.9898 146.062L55.9894 148.051L61.489 155.509V150.04L65.9886 155.509L63.9888 146.062H58.9892Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M17.5863 115.379L22.1669 120.943L14.0237 126L9.44309 115.379L23.6938 95.1494L25.7296 88.5747L21.149 85.5402L19.1132 87.0575L18.6043 92.6207L16.5684 86.5517L20.1311 82L27.2565 84.023L30.3102 93.6322L17.5863 115.379Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path
        d="M60.064 109.271L59.064 98.8307L56.0643 95.8477L51.0647 97.3392L0.999924 132.141L3.99968 135.124L0.999924 141.588L11.999 141.091L13.9989 154.017L25.9979 150.04L34.9972 157L42.9966 147.554L55.9455 153.023L55.0644 100.819H57.0642L60.064 109.271Z"
        fill="#2B2A30"
        stroke="#EAEAEA"
      />
      <path d="M58.1329 84.9944L60.6327 84" stroke="#EAEAEA" />
      <path
        d="M15.4926 153.52L38.7564 121.5M34.7817 157L42.7311 134M44.2216 129.5L50.6804 109M47.49 106.5L18.3861 130.5M1.49368 141.588L15.4926 132.141"
        stroke="#EAEAEA"
      />
      <path
        d="M97 84.1751L104.526 73.5L109.088 80.4274L110 100.983L101.675 109.5L97 101.096V84.1751Z"
        fill={status === 'done' ? '#C956FF' : '#26252b'}
      />
      <path
        d="M104.526 73.5L97 84.1751M104.526 73.5L109.088 80.4274M104.526 73.5L100.535 84.1751M97 84.1751V101.096M97 84.1751H98.7675M97 101.096L101.675 109.5M97 101.096L100.535 91.8975M101.675 109.5L110 100.983M101.675 109.5L105.211 103.027M110 100.983L109.088 80.4274M110 100.983L105.211 103.027M109.088 80.4274L104.526 89.1719M100.535 84.1751L102.36 89.1719M100.535 84.1751H98.7675M102.36 89.1719H104.526M102.36 89.1719L100.535 91.8975M104.526 89.1719L105.211 103.027M100.535 91.8975L98.7675 84.1751"
        stroke="#EAEAEA"
      />
      <epic1.Marker
        transform="translate(65 45)"
        status={levels.find((level) => level.name === 'epic1')?.status}
        onClick={() => onLevelClick(epic1)}
        focused={targetLevel?.level === epic1}
        level={epic1}
      />
      <epic2.Marker
        transform="translate(127 123)"
        status={levels.find((level) => level.name === 'epic2')?.status}
        onClick={() => onLevelClick(epic2)}
        focused={targetLevel?.level === epic2}
        level={epic2}
      />
    </IslandSVG>
  );
};

export default EpicIsland;
