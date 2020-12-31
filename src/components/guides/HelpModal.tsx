import React, { FC } from 'react';
import { trackLink } from '../../api/performance';
import Modal from '../modals/Modal';

interface HelpModalProps {
  onClose(): void;
}

const HelpModal: FC<HelpModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose} title="What is Trophy Hunter?">
      <p>
        Trophy Hunter is a new achievement app for League of Legends, it allows
        you to hunt for new crystals on Hunteria Islands, challenge yourself and
        strive to rule over them all, become the ultimate Trophy Hunter!
      </p>
      <p>
        Each challenge island has 5 difficulty levels, from beginner to pro.
        Find the best for you, you may find that your emotional and intellectual
        skills improve along with your core abilities.
      </p>
      <details>
        <summary>Main Features</summary>
        <p>
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
        </p>
      </details>
      <details>
        <summary>How it works</summary>
        <p>
          Simple! Play LoL Summoner’s Rift and wait for Trophy Hunter to analyze
          your match. After each match, you will get a list of obtained trophies
          and you can always see your progress and plan your path in the app.
        </p>
      </details>
      <details>
        <summary>Follow Us On Social</summary>
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
        <summary>Do I need to log in to the app?</summary>
        <p>
          The app will sync between your Riot account and the TH app
          automatically. You only have to log into LoL and run Trophy Hunter.
        </p>
      </details>
      <details>
        <summary>What games are supported by the app?</summary>
        <p>We currently support League of Legends. Coming soon: TFT LoR</p>
      </details>
      <details>
        <summary>Which game modes do you support?</summary>
        <p>
          Trophy Hunter Reforged officially supports Ranked Solo/Duo, Normal,
          and Flex game modes.
        </p>
      </details>
      <details>
        <summary>Which regions does Trophy Hunter Reforged support?</summary>
        <p>
          Trophy Hunter Reforged supports all regions except PBE and Garena.
        </p>
      </details>
      <details>
        <summary>
          Why does Trophy Hunter Reforged not support Garena servers
          (Philippines, Singapore and Malaysia, Indonesia, Thailand, Taiwan,
          Vietnam)?
        </summary>
        <p>
          Currently, Riot API does not support Garena, hence we cannot also.
        </p>
      </details>
      <details>
        <summary>Will I see the progress of other players?</summary>
        <p>
          At this moment no, community sharing and progress is a feature we
          currently develop as part of the full app.
        </p>
      </details>
      <details>
        <summary>
          What else do you do with those summoner names and progress?
        </summary>
        <p>
          Nothing else. We use the information Riot provides all its partners
          through the API and present it to you.
        </p>
      </details>
      <details>
        <summary>How can I send you logs?</summary>
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
    </Modal>
  );
};

export default HelpModal;
