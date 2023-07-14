/* eslint-disable max-len */
const template = `#### Found **{{=it.metadata.vulnerabilities.total}}** vulnerabilities within **{{=it.metadata.dependencies.total}}** dependencies.

{{?it.metadata.vulnerabilities.total}}
| Critical | High | Moderate | Low | Info |
|:---------|:-----|:---------|:----|:-----|
| {{=it.metadata.vulnerabilities.critical}} | {{=it.metadata.vulnerabilities.high}} | {{=it.metadata.vulnerabilities.moderate}} | {{=it.metadata.vulnerabilities.low}} | {{=it.metadata.vulnerabilities.info}} |
{{?}}

{{?it.vulnerabilities.length}}

#### Known vulnerabilities:

| Name | Package name | Severity | CVEs  | Recommendation |
|:--------------------|:--------------------|:---------------------------------|:-------|:-------|
{{~ it.vulnerabilities :advice}}| [{{=advice.title}}]({{=advice.url}}) | [{{=advice.module_name}}](https://www.npmjs.com/package/{{=advice.module_name}}) | {{=advice.severity}} | {{?advice.cwe}}[{{=advice.cwe}}](https://www.security-database.com/cwe.php?name={{=advice.cwe}}){{?}}{{?advice.cves.length && advice.cwe}},{{?}} {{~ advice.cves :cve}}[{{=cve}}](https://nvd.nist.gov/vuln/detail/{{=cve}}){{~}} | {{!advice.recommendation}} |
{{~}}
{{?}}

{{?it.actions.length}}
#### Recommended actions:

| Package | Action | Target version | Major update | What to do |
|:--------|:-------|:---------------|:----------------|:-----------|
{{~ it.actions :action}}| [{{=action.module}}](https://www.npmjs.com/package/{{=action.module}}) | {{=action.action}} | {{?action.target}}{{=action.target}}{{?}} | {{?action.isMajor}}**YES**{{?}} | {{=action.command}} |
{{~}}
{{?}}
`;

export default template;
