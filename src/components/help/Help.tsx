import React from 'react';
import { trackLink } from '../../api/performance';
import styled from '@emotion/styled';

const Container = styled.section`
  margin-top: 48px;
  padding: 15px 30px;

  summary::-webkit-details-marker,
  li::marker {
    color: #77777a;
  }

  details[open] > summary::-webkit-details-marker {
    color: #eaeaea;
  }
`;

const Content = styled.section`
  display: grid;
  grid-row-gap: 0.7em;
  overflow: auto;
  max-height: calc(100% - 48px);
  padding-right: 200px;
`;

const CombatSummary = styled.summary`
  color: var(--combat-color);
`;
const SkillsSummary = styled.summary`
  color: var(--skills-color);
`;
const TeamplaySummary = styled.summary`
  color: var(--teamplay-color);
`;
const ObjectivesSummary = styled.summary`
  color: var(--objectives-color);
`;
const EpicSummary = styled.summary`
  color: var(--epic-color);
`;

const Help = () => {
  return (
    <Container>
      <h2>Welcome to Trophy Hunter</h2>
      <Content>
        <h3>What is Trophy Hunter?</h3>
        <p>
          Trophy Hunter is a new achievement app for League of Legends, it
          allows you to hunt for new crystals on Hunteria Islands, challenge
          yourself and strive to rule over them all, become the ultimate Trophy
          Hunter!
        </p>
        <p>
          Each challenge island has 5 difficulty levels, from beginner to pro.
          Find the best for you, you may find that your emotional and
          intellectual skills improve along with your core abilities.
        </p>
        <details>
          <CombatSummary>Main Features</CombatSummary>
          <ul>
            <li>
              Over 200 different trophies to achieve, all with unique abilities
              and skills.
            </li>
            <li>
              Over 80 live progress trophies, so that you never miss a trophy
              you hunt that’s near completion.
            </li>
            <li>Special trophies to add extra fun to your journey</li>
            <li>
              An epic island to challenge the best of the best. Are you up for a
              challenge?
            </li>
            <li>Tons of gameplay, plus lots of challenges.</li>
            <li>Suitable for both casual and hardcore players.</li>
            <li>
              Keeping it fair! We do not support challenges that change your
              playstyle for the worse!!
            </li>
          </ul>
        </details>
        <details>
          <SkillsSummary>How it works</SkillsSummary>
          <p>
            Simple! Play LoL Summoner’s Rift and wait for Trophy Hunter to
            analyze your match. After each match, you will get a list of
            obtained trophies and you can always see your progress and plan your
            path in the app.
          </p>
        </details>
        <details>
          <TeamplaySummary>Follow Us On Social</TeamplaySummary>
          <p>
            <a
              href="https://discord.gg/NTZu8Px"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackLink('https://discord.gg/NTZu8Px')}
            >
              Discord
            </a>
            <br />
            <a
              href="https://github.com/lmachens/trophy-hunter"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackLink('https://github.com/lmachens/trophy-hunter')
              }
            >
              GitHub
            </a>
          </p>
        </details>
        <details>
          <ObjectivesSummary>Do I need to log in to the app?</ObjectivesSummary>
          <p>
            The app will sync between your Riot account and the TH app
            automatically. You only have to log into LoL and run Trophy Hunter.
          </p>
        </details>
        <details>
          <EpicSummary>What games are supported by the app?</EpicSummary>
          <p>We currently support League of Legends. Coming soon: TFT LoR</p>
        </details>
        <details>
          <CombatSummary>Which game modes do you support?</CombatSummary>
          <p>
            Trophy Hunter Reforged officially supports Ranked Solo/Duo, Normal,
            and Flex game modes.
          </p>
        </details>
        <details>
          <SkillsSummary>
            Which regions does Trophy Hunter Reforged support?
          </SkillsSummary>
          <p>
            Trophy Hunter Reforged supports all regions except PBE and Garena.
          </p>
        </details>
        <details>
          <TeamplaySummary>
            Why does Trophy Hunter Reforged not support Garena servers
            (Philippines, Singapore and Malaysia, Indonesia, Thailand, Taiwan,
            Vietnam)?
          </TeamplaySummary>
          <p>
            Currently, Riot API does not support Garena, hence we cannot also.
          </p>
        </details>
        <details>
          <ObjectivesSummary>
            Will I see the progress of other players?
          </ObjectivesSummary>
          <p>
            At this moment no, community sharing and progress is a feature we
            currently develop as part of the full app.
          </p>
        </details>
        <details>
          <EpicSummary>
            What else do you do with those summoner names and progress?
          </EpicSummary>
          <p>
            Nothing else. We use the information Riot provides all its partners
            through the API and present it to you.
          </p>
        </details>
        <details>
          <CombatSummary>How can I send you logs?</CombatSummary>
          <p>
            It&apos;s quite simple and takes just a few steps, please follow the
            instructions{' '}
            <a
              href="https://support.overwolf.com/support/solutions/articles/9000176827-how-to-get-your-overwolf-logs"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackLink(
                  'https://support.overwolf.com/support/solutions/articles/9000176827-how-to-get-your-overwolf-logs'
                )
              }
            >
              here
            </a>
            .
          </p>
        </details>
      </Content>
    </Container>
  );
};

export default Help;
