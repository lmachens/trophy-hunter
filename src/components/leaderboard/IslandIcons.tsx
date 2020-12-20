import styled from '@emotion/styled';
import React from 'react';
import { CombatIcon } from '../levels/combat';
import { EpicIcon } from '../levels/epic';
import { HubIcon } from '../levels/hub';
import { ObjectivesIcon } from '../levels/objectives';
import { SkillsIcon } from '../levels/skills';
import { SpecialIcon } from '../levels/special';
import { TeamworkIcon } from '../levels/teamwork';

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
    height: 22px;
    width: 22px;
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
      {islands.map((island) => {
        const Icon = icons[island];
        return <Icon key={island} />;
      })}
    </Container>
  );
};

export default IslandIcons;
