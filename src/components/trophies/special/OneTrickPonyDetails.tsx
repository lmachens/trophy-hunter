import { FC } from 'react';
import styled from '@emotion/styled';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const Champion = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 4px;
`;

const OneTrickPonyDetails: FC<{ details: any }> = ({ details }) => {
  return (
    <div>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <Champion
            key={index}
            src={
              details?.length > index
                ? `${publicRuntimeConfig.API_ENDPOINT}/api/champions/${details[index]}/img`
                : `${process.env.PUBLIC_DIR}/unknown.png`
            }
          />
        ))}
    </div>
  );
};

export default OneTrickPonyDetails;
