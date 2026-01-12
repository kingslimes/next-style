import fs from "fs";
import path from "path";
import babel from "@babel/core";

const input = "src/index.tsx";
const output = "builder/dist/index.jsx";

const source = fs.readFileSync(input, "utf8");
fs.mkdirSync(path.dirname(output), { recursive: true });

const result = await babel.transformAsync(source, {
    filename: input,
    presets: [
        ["@babel/preset-typescript", {
            allExtensions: true,
            isTSX: true
        }]
    ]
});

if (!result?.code) {
    throw new Error("Babel transform failed");
}

fs.writeFileSync(output, result.code);
