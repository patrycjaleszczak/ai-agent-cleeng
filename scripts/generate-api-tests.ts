import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';

interface OpenAPISchema {
  servers?: { url: string }[];
  paths?: Record<string, any>;
}

const WORKSPACE_ROOT = process.cwd();
const SCHEMA_PATH = path.resolve(WORKSPACE_ROOT, 'schema.yml');
const OUT_DIR = path.resolve(WORKSPACE_ROOT, 'tests', 'api', 'generated');

function readSchema(): OpenAPISchema {
  const raw = fs.readFileSync(SCHEMA_PATH, 'utf-8');
  return yaml.parse(raw) as OpenAPISchema;
}

function ensureOutDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function sanitizeForFileName(input: string): string {
  return input
    .replace(/\{[^}]+\}/g, (m) => m.replace(/\W/g, ''))
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 200);
}

function buildTestTitle(method: string, pathPattern: string, summary?: string): string {
  const base = `${method.toUpperCase()} ${pathPattern}`;
  return summary ? `${base} - ${summary}` : base;
}

function getDefaultServerUrl(schema: OpenAPISchema): string | undefined {
  return schema.servers && schema.servers.length > 0 ? schema.servers[0].url : undefined;
}

function generateTestFileContent(
  method: string,
  pathPattern: string,
  operation: any,
): string {
  const title = buildTestTitle(method, pathPattern, operation?.summary);
  const hasPathParams = /\{[^}]+\}/.test(pathPattern);
  const pathParamHints = (pathPattern.match(/\{([^}]+)\}/g) || []).map((x) => x.replace(/[{}]/g, ''));
  const resolvedPathExpr = hasPathParams
    ? '`' + pathPattern.replace(/\{([^}]+)\}/g, (_m, p1) => `\${process.env["PATH_${String(p1).toUpperCase()}"] || "REPLACE_${String(p1).toUpperCase()}"}`) + '`'
    : `'${pathPattern}'`;

  const securityComment = operation?.security ? ' // security: ' + JSON.stringify(operation.security) : '';
  const authSnippet = `const authHeader = process.env.AUTH_HEADER;`;

  return `import { test, expect } from '@playwright/test';

test('${title.replace(/'/g, "\\'")}', async ({ request, baseURL }) => {
  if (!baseURL) throw new Error('baseURL is not set');

  ${authSnippet}
  const urlPath = ${resolvedPathExpr};
  const url = new URL(urlPath, baseURL).toString();

  const headers: Record<string, string> = {};
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  // TODO: Provide query/body if required by schema${securityComment}
  const response = await request.${method}(url, {
    headers,
  });

  // Basic assertions. Adjust per endpoint contract.
  expect(response.status(), 'HTTP status should be 2xx/3xx').toBeGreaterThanOrEqual(200);
  expect(response.status(), 'HTTP status should be < 400').toBeLessThan(400);
});
`;
}

function main() {
  if (!fs.existsSync(SCHEMA_PATH)) {
    console.error(`Schema not found at ${SCHEMA_PATH}`);
    process.exit(1);
  }

  const schema = readSchema();
  const defaultServer = getDefaultServerUrl(schema);

  ensureOutDir(OUT_DIR);

  const indexLines: string[] = [];
  let generatedCount = 0;

  const paths = schema.paths || {};
  for (const pathPattern of Object.keys(paths)) {
    const pathItem = paths[pathPattern] || {};
    const methods: HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
    for (const method of methods) {
      if (!pathItem[method]) continue;
      const operation = pathItem[method];
      const fileSafe = sanitizeForFileName(`${method}_${pathPattern}`);
      const filePath = path.join(OUT_DIR, `${fileSafe}.spec.ts`);
      const content = generateTestFileContent(method, pathPattern, operation);
      fs.writeFileSync(filePath, content, 'utf-8');
      generatedCount++;
      indexLines.push(`export * from './${fileSafe}.spec';`);
    }
  }

  // Write an optional README note
  const note = `// Auto-generated API tests
// Base URL precedence: BASE_URL > PW_BASE_URL > schema default (${defaultServer ?? 'n/a'})\n`;
  fs.writeFileSync(path.join(OUT_DIR, '_README.generated.ts'), note, 'utf-8');

  console.log(`Generated ${generatedCount} test files in ${OUT_DIR}`);
}

main();

