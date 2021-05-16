import styled from '@emotion/styled';
import { apiEndoint } from '../../../api/utils/runtime';

const Champion = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 4px;
`;

type LastChampionsProps = {
  details: any;
  maxProgress: number;
};
const LastChampions = ({ details, maxProgress }: LastChampionsProps) => {
  return (
    <div>
      {Array(maxProgress)
        .fill(null)
        .map((_, index) => (
          <Champion
            key={index}
            src={
              details?.length > index
                ? `${apiEndoint}/api/champions/${details[index]}/img`
                : `${process.env.PUBLIC_DIR}/unknown.png`
            }
          />
        ))}
    </div>
  );
};

export default LastChampions;
