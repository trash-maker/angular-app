const { exec } = require("child_process");
const assert = require("assert");

try {
  assert(
    process.argv.length === 4,
    "Usage: generate-scam.js [type] [scam path]",
    {}
  );
  const type = process.argv[2];
  assert(
    ["c", "component", "d", "directive", "p", "pipe"].includes(type),
    "Usage: generate-scam.js [component|directive|pipe|c|d|p] [scam path]"
  );
  const path = process.argv[3].split(/[\\\/]/);
  const folder = path.slice(0, -1).join("/");
  const name = path[path.length - 1];
  console.info("Generating SCAM...");
  exec(
    [
      `ng g m ${folder && folder + "/"}${name}`,
      `ng g ${type} ${folder && folder + "/"}${name}/${name} --flat --export`,
    ].join("&&"),
    (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        console.info("❌ SCAM generation failed.");
        return;
      }
      console.log(stdout);
      console.error(stderr);
      console.info("✅ SCAM generated. Enjoy 🧡");
    }
  );
} catch (error) {
  console.error(error.message);
}
