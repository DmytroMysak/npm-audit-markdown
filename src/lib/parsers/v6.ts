/* eslint-disable import/extensions */
import type {
  DependenciesMeta,
  NormalizedAuditReport,
  SuggestedAction,
  VulnerabilitiesMeta,
} from '../NormalizedAuditReport.js';

const normalizeVulnerabilities = (vulnerability: any) => ({
  ...vulnerability,
  recommendation: vulnerability.recommendation ? vulnerability.recommendation.replace('\n', ' ') : '',
});

const normalizeDependencies = (metadata: any): DependenciesMeta => ({
  prod: metadata.prodDependencies ?? 0,
  dev: metadata.devDependencies ?? 0,
  optional: metadata.optionalDependencies ?? 0,
  peer: metadata.peerDependencies ?? 0,
  peerOptional: metadata.peerOptionalDependencies ?? 0,
  total: metadata.totalDependencies ?? 0,
});

const normalizeVulnerabilitiesMeta = (metadata: any): VulnerabilitiesMeta => {
  const vulnerabilities = metadata.vulnerabilities || [];

  let total = 0;
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const vul in vulnerabilities) {
    const count = vulnerabilities[vul];
    total += count;
  }
  return {
    ...metadata.vulnerabilities,
    total,
  };
};

const findActionResolvesDepth = (action: any) =>
  action.resolves.reduce((result: any, v: any) => {
    const depth = v.path.split('>').length - 1;
    return depth > result ? depth : result;
  }, 0);

const proposeAction = (action: any): SuggestedAction => {
  const isDev = action.resolves.reduce((result: any, v: any) => v.dev && result, true);
  switch (action.action) {
    case 'install':
      return { ...action, command: `npm install ${isDev ? '--save-dev' : ''} ${action.module}@${action.target}` };
    case 'review':
      return { ...action, command: 'Manual review' };
    case 'update':
      return { ...action, command: `npm update ${action.module} --depth ${findActionResolvesDepth(action)}` };
    default:
      return { ...action, command: 'Manual review' };
  }
};

export default function v6(data: any): NormalizedAuditReport {
  return {
    vulnerabilities: Object.values(data.advisories).map(normalizeVulnerabilities),
    actions: data.actions.map(proposeAction),
    metadata: {
      dependencies: normalizeDependencies(data.metadata),
      vulnerabilities: normalizeVulnerabilitiesMeta(data.metadata),
    },
  };
}
