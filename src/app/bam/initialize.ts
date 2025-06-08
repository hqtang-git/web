import { initialLifeGovernanceBffGovernanceMainOptions } from 'shared-bam-code/life.governance.bff_governance_main';
import { initialLifeGovernanceBffGovernancePunishV2Options } from 'shared-bam-code/life.governance.bff_governance_punish_v2';

import { request } from './request';

/**
 * 应用初始化
 */
export function initializeBamCode() {
  initialLifeGovernanceBffGovernanceMainOptions({ request });
  initialLifeGovernanceBffGovernancePunishV2Options({ request });
}
