import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";

let tempDir;
let tarball;

try {
  const packOutput = execFileSync(npm, ["pack", "--json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });

  const [packed] = JSON.parse(packOutput);

  tarball = resolve(packed.filename);

  console.log(`Packed: ${packed.filename}`);

  console.log(`Package size: ${packed.size} bytes`);

  console.log(`Unpacked size: ${packed.unpackedSize} bytes`);

  const publishedFiles = packed.files.map(({ path }) => path);

  if (
    publishedFiles.some(
      (path) => path.startsWith("src/") || path.startsWith("test/"),
    )
  ) {
    throw new Error("Source or test files were included in the npm package.");
  }

  if (!publishedFiles.includes("dist/index.js")) {
    throw new Error("dist/index.js is missing from the npm package.");
  }

  if (!publishedFiles.includes("dist/index.d.ts")) {
    throw new Error("dist/index.d.ts is missing from the npm package.");
  }

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

  execFileSync(
    npm,
    ["install", "--ignore-scripts", "--no-audit", "--no-fund", tarball],
    {
      cwd: tempDir,
      stdio: "inherit",
    },
  );

  writeFileSync(
    join(tempDir, "test.mjs"),
    `
import {
  new_keys,
  private_key_to_wif,
  validate_private_key,
} from "antelope-ecc";

import privateKeyToWifDeep from
  "antelope-ecc/keys/private_key_to_wif.js";

const privateKey =
  new Uint8Array(32).fill(1);

// Root synchronous API.
const rootResult =
  private_key_to_wif(privateKey);

if (
  rootResult &&
  typeof rootResult.then === "function"
) {
  throw new Error(
    "private_key_to_wif unexpectedly returned a Promise"
  );
}

if (
  typeof rootResult !== "string" ||
  !rootResult.startsWith("PVT_K1_")
) {
  throw new Error(
    "private_key_to_wif returned an invalid result"
  );
}

// Deep import.
const deepResult =
  privateKeyToWifDeep(privateKey);

if (rootResult !== deepResult) {
  throw new Error(
    "Root and deep exports produced different results"
  );
}

// Synchronous validator.
const valid =
  validate_private_key(rootResult);

if (valid !== true) {
  throw new Error(
    "Generated private key failed validation"
  );
}

// Synchronous key generation.
const generated =
  new_keys(privateKey);

if (
  generated &&
  typeof generated.then === "function"
) {
  throw new Error(
    "new_keys unexpectedly returned a Promise"
  );
}

if (
  generated.private_key !== rootResult
) {
  throw new Error(
    "new_keys returned an unexpected private key"
  );
}

if (
  typeof generated.public_key !== "string" ||
  !generated.public_key.startsWith("PUB_K1_")
) {
  throw new Error(
    "new_keys returned an invalid public key"
  );
}

console.log(
  "✓ root package import works"
);
console.log(
  "✓ deep package import works"
);
console.log(
  "✓ synchronous API works"
);
console.log(
  "✓ TypeScript-built distribution works"
);
console.log(
  "✓ npm package smoke test passed"
);
`,
  );

  execFileSync(process.execPath, ["test.mjs"], {
    cwd: tempDir,
    stdio: "inherit",
  });
} finally {
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
