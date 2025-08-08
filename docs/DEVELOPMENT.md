# Material Theme Source Files

This directory contains the modular source files for the Material Theme for VS Code. The theme is built by merging these files into a single JSON file.

## Requirements

**Node.js 22+** or **Deno** is required to build the theme. The build script is written in TypeScript and uses:
- **Node 22**: Built-in TypeScript support with `--experimental-strip-types`
- **Deno**: Native TypeScript support

### Installation Options:

**Node.js 22:**
```bash
# Install Node.js 22 from nodejs.org or using a version manager:
nvm install 22
nvm use 22
```

**Deno:**
```bash
# Install Deno from deno.land
curl -fsSL https://deno.land/install.sh | sh
# or with Homebrew:
brew install deno
```

## Structure

```
src/
├── base/
│   ├── colors.json         # UI colors (editor, sidebar, status bar, etc.)
│   └── general.json        # General language rules (comments, strings, keywords, etc.)
├── languages/
│   ├── terraform.json      # Terraform and HCL specific styling
│   ├── javascript.json     # JavaScript, TypeScript, React (JSX/TSX), Angular
│   ├── python.json         # Python specific styling
│   ├── markup-data.json    # HTML, CSS, Markdown, JSON, YAML styling
│   ├── shell.json          # Shell/Bash specific styling
│   ├── csharp.json         # C# specific styling
│   └── php.json            # PHP specific styling
└── build.ts                # Build script to merge all files (TypeScript)
```

## Development Workflow

### 1. **Edit Source Files**
- Modify individual language files in `src/languages/`
- Update base colors in `src/base/colors.json`
- Update general rules in `src/base/general.json`

### 2. **Build Theme**
```bash
# Build with Node.js 22
npm run build

# Or build with Deno
npm run build:deno
# or directly:
deno run --allow-read --allow-write src/build.ts

# For development (builds + shows message)
npm run dev
```

### 3. **Test Changes**
- After building, reload VS Code to see changes
- The built theme will be in `themes/material-theme-for-vscode-dark.json`

### 4. **Publish**
- Create a pull request to `main` branch
- When merged, GitHub Actions will automatically:
  1. Build the theme from source files
  2. Publish to VS Code Marketplace

## Adding New Languages

To add support for a new language:

1. **Create a new file** in `src/languages/` (e.g., `php.json`)
2. **Follow the structure**:
```json
{
  "tokenColors": [
    {
      "name": "PHP - Description",
      "scope": ["scope.for.php"],
      "settings": {
        "foreground": "#COLOR",
        "fontStyle": "bold"
      }
    }
  ]
}
```
3. **Run the build** - the new file will be automatically included

## Material Design Colors

The theme uses these core colors:

- **Background**: `#263238` (Dark blue-gray)
- **Foreground**: `#EEFFFF` (Light cyan)
- **Accent**: `#89DDFF` (Cyan)
- **Keywords**: `#C792EA` (Purple)
- **Strings**: `#C3E88D` (Green)
- **Functions**: `#82AAFF` (Blue)
- **Classes/Types**: `#FFCB6B` (Yellow)
- **Comments**: `#546E7A` (Gray)
- **Numbers**: `#F78C6C` (Orange)

## Notes

- The build script automatically merges all JSON files
- Changes to source files require rebuilding to take effect
- The original monolithic theme file is no longer edited directly
- All language-specific rules should go in their respective files
