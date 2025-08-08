import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Build script to merge theme source files into a single VS Code theme
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_DIR = join(__dirname, '.');
const OUTPUT_DIR = join(__dirname, '..', 'themes');
const OUTPUT_FILE = 'material-theme-for-vscode-dark.json';

type ThemeColors = {
  [key: string]: string;
};

type TokenColor = {
  name: string;
  scope: string | string[];
  settings: {
    foreground?: string;
    background?: string;
    fontStyle?: string;
  };
};

type ThemeData = {
  colors?: ThemeColors;
  tokenColors?: TokenColor[];
};

type Theme = {
  name: string;
  colors: ThemeColors;
  tokenColors: TokenColor[];
};

/**
 * @func readJsonFile
 * @description Reads a JSON file and returns its content as an object.
 *
 * @param {string} filePath - The path to the JSON file.
 *
 * @returns {ThemeData} The parsed JSON content.
 * @throws {Error} If the file cannot be read or parsed.
 */
const readJsonFile = (filePath: string): ThemeData => {
  try {
    const content = readFileSync(filePath, 'utf8');
    return JSON.parse(content) as ThemeData;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, (error as Error).message);
    throw new Error(`Failed to read theme source file: ${filePath}`);
  }
};

/**
 * @func getAllJsonFiles
 * @description Recursively retrieves all JSON files from a directory, excluding package.json.
 *
 * @param {string} directory The directory to search for JSON files.
 *
 * @returns {string[]} An array of paths to JSON files.
 */
const getAllJsonFiles = (directory: string): string[] => {
  const files: string[] = [];

  const traverse = (currentDir: string): void => {
    const items = readdirSync(currentDir);

    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.json') && item !== 'package.json') {
        files.push(fullPath);
      }
    }
  };

  traverse(directory);
  return files;
};

/**
 * @func buildTheme
 * @description Builds the Material Theme for VS Code by merging all source JSON files.
 *
 * @returns {void}
 * @throws {Error} If the build process fails.
 */
const buildTheme = (): void => {
  try {
    console.log('🔨 Building Material Theme for VS Code...');

    // Get all JSON files from src directory
    const sourceFiles = getAllJsonFiles(SRC_DIR);
    console.log(`📂 Found ${sourceFiles.length} source files`);

    // Initialize theme structure
    const theme: Theme = {
      name: "material-theme-for-vscode",
      colors: {},
      tokenColors: []
    };

    // Process each source file
    for (const filePath of sourceFiles) {
      const relativePath = relative(SRC_DIR, filePath);
      console.log(`📝 Processing: ${relativePath}`);

      const data = readJsonFile(filePath);

      // Merge colors if present
      if (data.colors) {
        Object.assign(theme.colors, data.colors);
      }

      // Merge tokenColors if present
      if (data.tokenColors && Array.isArray(data.tokenColors)) {
        theme.tokenColors.push(...data.tokenColors);
      }
    }

    // Ensure output directory exists
    if (!existsSync(OUTPUT_DIR)) {
      mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Write the merged theme
    const outputPath = join(OUTPUT_DIR, OUTPUT_FILE);
    writeFileSync(outputPath, JSON.stringify(theme, null, 2));

    console.log(`✅ Theme built successfully!`);
    console.log(`📍 Output: ${outputPath}`);
    console.log(`📊 Stats: ${Object.keys(theme.colors).length} colors, ${theme.tokenColors.length} token rules`);
  } catch (error) {
    console.error('❌ Build failed:', (error as Error).message);
    throw error;
  }
};

// Run the build
buildTheme();
