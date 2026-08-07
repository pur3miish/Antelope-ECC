import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";

let tempDir;
let tarball;

try {
  // --------------------------------------------------
  // Pack the exact artifact npm would publish
  // --------------------------------------------------

  const packOutput = execFileSync(npm, ["pack", "--json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });

  const packResult = JSON.parse(packOutput);
  const packed = packResult[0];

  tarball = resolve(packed.filename);

  console.log(`Packed: ${packed.filename}`);
  console.log(`Package size: ${packed.size} bytes`);
  console.log(`Unpacked size: ${packed.unpackedSize} bytes`);

  // --------------------------------------------------
  // Sanity-check published files
  // --------------------------------------------------

  const publishedFiles = packed.files.map(({ path }) => path);

  if (
    publishedFiles.some(
      (path) => path.startsWith("src/") || path.startsWith("test/"),
    )
  ) {
    throw new Error("Source or test files were included in the npm package");
  }

  if (!publishedFiles.includes("dist/index.js")) {
    throw new Error("dist/index.js is missing from the npm package");
  }

  if (!publishedFiles.includes("dist/index.d.ts")) {
    throw new Error("dist/index.d.ts is missing from the npm package");
  }

  // --------------------------------------------------
  // Create isolated consumer project
  // --------------------------------------------------

  tempDir = mkdtempSync(join(tmpdir(), "antelope-ecc-smoke-"));

  writeFileSync(
    join(tempDir, "package.json"),
    JSON.stringify(
      {
        private: true,
        type: "module",
      },
      null,
      2,
    ),
  );

  // --------------------------------------------------
  // Install exactly the packed npm artifact
  // --------------------------------------------------

  execFileSync(
    npm,
    ["install", "--ignore-scripts", "--no-audit", "--no-fund", tarball],
    {
      cwd: tempDir,
      stdio: "inherit",
    },
  );

  // --------------------------------------------------
  // Consumer smoke test
  // --------------------------------------------------

  writeFileSync(
    join(tempDir, "test.mjs"),
    `
import {
  private_key_to_wif,
  validate_private_key,
  sign,
} from "antelope-ecc";

import privateKeyToWifDeep from
  "antelope-ecc/keys/private_key_to_wif.js";

// --------------------------------------------------
// Root exports
// --------------------------------------------------

if (typeof private_key_to_wif !== "function") {
  throw new Error(
    "Root export private_key_to_wif is unavailable"
  );
}

if (typeof validate_private_key !== "function") {
  throw new Error(
    "Root export validate_private_key is unavailable"
  );
}

if (typeof sign !== "function") {
  throw new Error(
    "Root export sign is unavailable"
  );
}

// --------------------------------------------------
// Deep export
// --------------------------------------------------

if (typeof privateKeyToWifDeep !== "function") {
  throw new Error(
    "Deep export private_key_to_wif is unavailable"
  );
}

// --------------------------------------------------
// Actual runtime operation
// --------------------------------------------------

const privateKey = new Uint8Array(32);
privateKey.fill(1);

const rootResult = await Promise.resolve(
  private_key_to_wif(privateKey)
);

const deepResult = await Promise.resolve(
  privateKeyToWifDeep(privateKey)
);

if (typeof rootResult !== "string") {
  throw new Error(
    "private_key_to_wif did not return a string"
  );
}

if (!rootResult.startsWith("PVT_K1_")) {
  throw new Error(
    \`Unexpected private key format: \${rootResult}\`
  );
}

if (rootResult !== deepResult) {
  throw new Error(
    "Root and deep exports produced different results"
  );
}

// --------------------------------------------------
// Validate generated key
// --------------------------------------------------

const valid = await Promise.resolve(
  validate_private_key(rootResult)
);

if (valid !== true) {
  throw new Error(
    "Generated private key failed validation"
  );
}

console.log("✓ root package import works");
console.log("✓ deep package import works");
console.log("✓ TypeScript-built distribution works");
console.log("✓ private_key_to_wif works");
console.log("✓ generated PVT_K1 key validates");
console.log("✓ npm package smoke test passed");
`,
  );

  execFileSync(process.execPath, ["test.mjs"], {
    cwd: tempDir,
    stdio: "inherit",
  });

  console.log("✓ Antelope-ECC package is installable");
} finally {
  // --------------------------------------------------
  // Cleanup
  // --------------------------------------------------

  if (tempDir) {
    rmSync(tempDir, {
      recursive: true,
      force: true,
    });
  }

  if (tarball) {
    try {
      unlinkSync(tarball);
    } catch {
      // Ignore cleanup errors.
    }
  }
}
