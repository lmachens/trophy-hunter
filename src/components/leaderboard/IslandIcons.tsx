import styled from '@emotion/styled';
import React from 'react';
import { CombatIcon } from '../levels/combat';
import { EpicIcon } from '../levels/epic';
import { HubIcon } from '../levels/hub';
import { ObjectivesIcon } from '../levels/objectives';
import { SkillsIcon } from '../levels/skills';
import { SpecialIcon } from '../levels/special';
import { TeamworkIcon } from '../levels/teamwork';
import { Tooltip } from '../tooltip';

const icons = {
  hub: HubIcon,
  combat: CombatIcon,
  skills: SkillsIcon,
  teamwork: TeamworkIcon,
  objectives: ObjectivesIcon,
  epic: EpicIcon,
  special: SpecialIcon,
};

const Container = styled.div`
  margin-top: -3px;
  display: flex;
  flex-wrap: wrap;
  svg {
    background: #2b2a30;
    height: 20px;
    width: 20px;
    padding: 1px;
    margin-top: 3px;
  }
  svg:not(:last-child) {
    margin-right: 3px;
  }
`;

type Props = {
  islands: string[];
  className?: string;
};
const IslandIcons = ({ islands, className }: Props) => {
  return (
    <Container className={className}>
      {Object.entries(icons).map(([island, Icon]) => {
        return (
          <Tooltip
            key={island}
            text={`${island.charAt(0).toUpperCase() + island.slice(1)} Island`}
            placement="top"
          >
            <Icon disabled={!islands.includes(island)} />
          </Tooltip>
        );
      })}
    </Container>
  );
};

export default IslandIcons;
