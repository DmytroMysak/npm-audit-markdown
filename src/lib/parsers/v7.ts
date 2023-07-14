/* eslint-disable import/extensions */
import type { NormalizedAuditReport, Vulnerability } from '../NormalizedAuditReport.js';

const determineFix = (fixAvailable: boolean | Record<string, any>): string => {
  if (typeof fixAvailable === 'object') {
    return `Update ${fixAvailable.name} to ${fixAvailable.version}`;
  }
  if (fixAvailable === true) {
    return 'Run `npm audit fix`';
  }
  return `Manual review`;
};

function normalizeVulnerabilities(data: Record<string, any>) {
  const vulnerabilities: any[] = [];

  Object.entries<any>(data.vulnerabilities).forEach(([, properties]) => {
    const recommendation = determineFix(properties.fixAvailable);

    properties.via.forEach((via: any) => {
      if (typeof via === 'object') {
        vulnerabilities.push({ ...via, recommendation });
      }
    });
  });

  const unique: any[] = [];

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const v of vulnerabilities) {
    if (!unique.find((item: any) => item.source === v.source)) {
      unique.push(v);
    }
  }

  return unique.map(
    (reason: any): Vulnerability => ({
      title: reason.title,
      url: reason.url,
      module_name: reason.name,
      severity: reason.severity,
      cwe: [],
      cves: [],
      recommendation: reason.recommendation,
    })
  );
}

export default function v7(data: Record<string, any>): NormalizedAuditReport {
  return {
    vulnerabilities: normalizeVulnerabilities(data),
    actions: [],
    metadata: {
      vulnerabilities: data.metadata?.vulnerabilities,
      dependencies: data.metadata?.dependencies,
    },
  };
}
