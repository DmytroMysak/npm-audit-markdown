#### Found **23** vulnerabilities within **687** dependencies.


| Critical | High | Moderate | Low | Info |
|:---------|:-----|:---------|:----|:-----|
| 3 | 14 | 6 | 0 | 0 |




#### Known vulnerabilities:

| Name | Package name | Severity | CVEs  | Recommendation |
|:--------------------|:--------------------|:---------------------------------|:-------|:-------|
| [Prototype Pollution in minimist](https://github.com/advisories/GHSA-xvch-5gv4-984h) | [minimist](https://www.npmjs.com/package/minimist) | critical | [CWE-1321](https://www.security-database.com/cwe.php?name=CWE-1321), [CVE-2021-44906](https://nvd.nist.gov/vuln/detail/CVE-2021-44906) | Upgrade to version 1.2.6 or later |
| [json-schema is vulnerable to Prototype Pollution](https://github.com/advisories/GHSA-896r-f27r-55mw) | [json-schema](https://www.npmjs.com/package/json-schema) | moderate | [CWE-915,CWE-1321](https://www.security-database.com/cwe.php?name=CWE-915,CWE-1321), [CVE-2021-3918](https://nvd.nist.gov/vuln/detail/CVE-2021-3918) | Upgrade to version 0.4.0 or later |
| [node-fetch is vulnerable to Exposure of Sensitive Information to an Unauthorized Actor](https://github.com/advisories/GHSA-r683-j2x4-v87g) | [node-fetch](https://www.npmjs.com/package/node-fetch) | high | [CWE-173,CWE-200,CWE-601](https://www.security-database.com/cwe.php?name=CWE-173,CWE-200,CWE-601), [CVE-2022-0235](https://nvd.nist.gov/vuln/detail/CVE-2022-0235) | Upgrade to version 2.6.7 or later |
| [Inefficient Regular Expression Complexity in marked](https://github.com/advisories/GHSA-5v2h-r2cx-5xgj) | [marked](https://www.npmjs.com/package/marked) | high | [CWE-1333](https://www.security-database.com/cwe.php?name=CWE-1333), [CVE-2022-21681](https://nvd.nist.gov/vuln/detail/CVE-2022-21681) | Upgrade to version 4.0.10 or later |
| [Inefficient Regular Expression Complexity in marked](https://github.com/advisories/GHSA-rrrm-qjm4-v8hf) | [marked](https://www.npmjs.com/package/marked) | high | [CWE-1333](https://www.security-database.com/cwe.php?name=CWE-1333), [CVE-2022-21680](https://nvd.nist.gov/vuln/detail/CVE-2022-21680) | Upgrade to version 4.0.10 or later |
| [ Inefficient Regular Expression Complexity in chalk/ansi-regex](https://github.com/advisories/GHSA-93q8-gq69-wqmw) | [ansi-regex](https://www.npmjs.com/package/ansi-regex) | high | [CWE-1333](https://www.security-database.com/cwe.php?name=CWE-1333), [CVE-2021-3807](https://nvd.nist.gov/vuln/detail/CVE-2021-3807) | Upgrade to version 3.0.1 or later |
| [ Inefficient Regular Expression Complexity in chalk/ansi-regex](https://github.com/advisories/GHSA-93q8-gq69-wqmw) | [ansi-regex](https://www.npmjs.com/package/ansi-regex) | high | [CWE-1333](https://www.security-database.com/cwe.php?name=CWE-1333), [CVE-2021-3807](https://nvd.nist.gov/vuln/detail/CVE-2021-3807) | Upgrade to version 5.0.1 or later |




#### Recommended actions:

| Package | Action | Target version | Major update | What to do |
|:--------|:-------|:---------------|:----------------|:-----------|
| [semantic-release](https://www.npmjs.com/package/semantic-release) | install | 19.0.2 | **YES** | npm install --save-dev semantic-release@19.0.2 |
| [minimist](https://www.npmjs.com/package/minimist) | update | 1.2.6 |  | npm update minimist --depth 5 |
| [@semantic-release/npm](https://www.npmjs.com/package/@semantic-release/npm) | update | 8.0.3 |  | npm update @semantic-release/npm --depth 14 |
| [node-fetch](https://www.npmjs.com/package/node-fetch) | update | 2.6.7 |  | npm update node-fetch --depth 6 |


