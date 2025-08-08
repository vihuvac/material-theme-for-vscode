# Contributing to Material Theme for VS Code

Thank you for your interest in contributing to the Material Theme for VS Code! This guide will help you understand how to contribute effectively to this project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Review Process](#review-process)

## Getting Started

### Prerequisites

- **Node.js 22+** or **Deno** (for building the theme)
- **Git** (for version control)
- **VS Code** (for testing)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/material-theme-for-vscode.git
   cd material-theme-for-vscode
   ```

2. **Install Dependencies** (if any)
   ```bash
   # No npm dependencies required!
   # The build uses Node 22 native TypeScript support
   ```

3. **Build the Theme**
   ```bash
   npm run build
   # or with Deno
   npm run build:deno
   ```

4. **Test in VS Code**
   - Open VS Code
   - Install the theme from the built `.json` file
   - Test with different file types

## Project Structure

```
material-theme-for-vscode/
├── .github/
│   └── workflows/
│       └── build-and-publish.yml    # Automated publishing
├── docs/                            # Documentation
│   ├── CONTRIBUTING.md              # This file
│   ├── DEVELOPMENT.md               # Development guide
│   └── ARCHITECTURE.md              # Project architecture
├── src/                             # Theme source files
│   ├── base/                        # Core theme files
│   ├── languages/                   # Language-specific styling
│   └── build.ts                     # Build script
├── themes/                          # Generated theme files
├── images/                          # Screenshots and assets
└── package.json                     # Extension metadata
```

## Making Changes

### Types of Contributions

1. **🎨 Theme Improvements**
   - Color adjustments
   - New language support
   - UI element styling

2. **🐛 Bug Fixes**
   - Color contrast issues
   - Missing syntax highlighting
   - Theme inconsistencies

3. **📚 Documentation**
   - Setup guides
   - Usage examples
   - Code comments

4. **🔧 Tooling**
   - Build script improvements
   - CI/CD enhancements
   - Development workflow

### Adding New Language Support

1. Create a new file in `src/languages/` (e.g., `rust.json`)
2. Follow the existing structure:
   ```json
   {
     "tokenColors": [
       {
         "name": "Rust - Description",
         "scope": ["scope.for.rust"],
         "settings": {
           "foreground": "#COLOR",
           "fontStyle": "bold"
         }
       }
     ]
   }
   ```
3. Use Material Design colors consistently
4. Test with real code files

### Modifying Existing Colors

1. **For UI elements**: Edit `src/base/colors.json`
2. **For language tokens**: Edit the appropriate file in `src/languages/`
3. **For general rules**: Edit `src/base/general.json`

## Testing

### Manual Testing Checklist

- [ ] Build completes without errors
- [ ] Theme loads in VS Code
- [ ] All supported languages display correctly
- [ ] UI elements are readable and consistent
- [ ] No accessibility issues (contrast ratios)

### Test Files

Create test files for your changes:
```
test-files/
├── test.js    # JavaScript
├── test.ts    # TypeScript
├── test.py    # Python
├── test.tf    # Terraform
└── ...
```

## Submitting Changes

### Commit Messages

Use conventional commit format:
```
feat: add support for Rust language
fix: improve JSON string color contrast
docs: update development setup guide
refactor: reorganize language files
```

### Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feat/add-rust-support
   ```

2. **Make Your Changes**
   - Edit source files
   - Build and test
   - Update documentation

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -S -m "feat: add Rust language support"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feat/add-rust-support
   ```

5. **Open Pull Request**
   - Use the PR template
   - Include screenshots for visual changes
   - Reference any related issues

### PR Requirements

- ✅ All commits must be **signed** (`git commit -S`)
- ✅ Include **before/after screenshots** for visual changes
- ✅ Update **documentation** if needed
- ✅ Test with **multiple file types**
- ✅ Follow **Material Design** color principles

## Code Style

### File Organization

- Keep language-specific rules in their respective files
- Use descriptive names for token rules
- Group related scopes together
- Comment complex scope patterns

### Color Usage

- Use existing Material Design palette
- Maintain consistent contrast ratios
- Test with both light and dark backgrounds
- Consider colorblind accessibility

### JSON Formatting

- Use 2-space indentation
- Sort scopes alphabetically when possible
- Use descriptive rule names

## Review Process

1. **Automated Checks**
   - Build succeeds
   - No JSON syntax errors
   - File structure is valid

2. **Manual Review**
   - Visual quality assessment
   - Code organization
   - Documentation updates

3. **Testing**
   - Theme functionality
   - Cross-platform compatibility
   - Performance impact

## Getting Help

- 📖 Read the [Development Guide](./DEVELOPMENT.md)
- 🏗️ Check the [Architecture Guide](./ARCHITECTURE.md)
- 💬 Open a [Discussion](https://github.com/vihuvac/material-theme-for-vscode/discussions)
- 🐛 Report issues via [GitHub Issues](https://github.com/vihuvac/material-theme-for-vscode/issues)

## Recognition

Contributors will be:
- Listed in the main README
- Mentioned in release notes
- Credited in the VS Code Marketplace description

Thank you for contributing to make this theme better for everyone! 🎉
