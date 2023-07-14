export interface Vulnerability {
    title: string;
    url: string;
    module_name: string;
    severity: string;
    cwe: string[];
    cves: string[];
    recommendation: string;
}

export interface SuggestedAction {
    module: string;
    action: string;
    target: string;
    jsMajor: boolean;
    command: string;
}

export interface VulnerabilitiesMeta {
    info: number;
    low: number;
    moderate: number;
    high: number;
    critical: number;
    total: number;
}

export interface DependenciesMeta {
    prod: number;
    dev: number;
    optional: number;
    peer: number;
    peerOptional: number;
    total: number;
}

export interface NormalizedAuditReport {
    vulnerabilities: Vulnerability[];
    actions: SuggestedAction[];
    metadata: {
        vulnerabilities: VulnerabilitiesMeta;
        dependencies: DependenciesMeta;
    };
}
