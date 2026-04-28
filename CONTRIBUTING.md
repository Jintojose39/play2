# Contributing to Play2

Thank you for your interest in contributing to the Play2 Test Automation Framework! This document provides guidelines and instructions for contributing.

---

## 📋 Code of Conduct

Please be respectful and constructive in all interactions with other contributors and maintainers.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- Git
- npm or yarn

### Development Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/play2.git
cd play2

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Install dependencies
npm install

# 4. Install Playwright browsers
npx playwright install

# 5. Create .env file for local development
cp .env.example .env
# Edit .env with your configuration
```

---

## 📝 Contribution Types

### Bug Reports

Found a bug? Please report it by:

1. Checking if the issue already exists
2. Creating a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details (OS, Node version, etc.)
   - Screenshots/logs if applicable

### Feature Requests

Have an idea for improvement? Please:

1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear feature description
   - Use case and motivation
   - Proposed implementation (if you have one)
   - Examples of how it would be used

### Code Contributions

Ready to submit code? Follow these steps:

---

## 🔧 Making Changes

### 1. Create a Feature Branch

```bash
git checkout -b feature/descriptive-name
# or for bug fixes:
git checkout -b bugfix/issue-description
```

### 2. Make Your Changes

**Rules:**
- Keep changes focused and atomic
- Follow existing code style
- Add meaningful commit messages
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run specific tests
npx playwright test tests/your-test.spec.js

# Run with debugging
npx playwright test --debug

# Generate reports
npm run report
```

### 4. AI Test Integration Features

If adding/modifying AI features:

```bash
# Test failure analysis examples
npm run ai:analyze-failures

# Test generation examples
npm run ai:generate-tests

# Test AI quickstart guide
npm run ai:quickstart
```

---

## 📐 Code Style

### File Organization

```javascript
// 1. Imports at the top
import { something } from 'module';

// 2. Constants
const CONSTANT_NAME = 'value';

// 3. Class/Function declaration
class MyClass {
  // Code here
}

// 4. Exports at the bottom
export default MyClass;
```

### Naming Conventions

- **Files**: kebab-case (my-file.js)
- **Classes**: PascalCase (MyClass)
- **Functions/Methods**: camelCase (myFunction)
- **Constants**: UPPER_SNAKE_CASE (MY_CONSTANT)
- **Variables**: camelCase (myVariable)

### Comments

```javascript
// Use comments for complex logic or non-obvious implementations
// Avoid obvious comments

/**
 * Function description for JSDoc
 * @param {type} param - Parameter description
 * @returns {type} Return description
 */
function example(param) {
  // Implementation
}
```

### Error Handling

```javascript
// Good
try {
  await performAction();
} catch (error) {
  console.error('Descriptive error message:', error);
  throw error;
}

// Avoid swallowing errors silently
```

---

## 🧪 Testing Guidelines

### Test Structure

```javascript
import { test, expect } from "@playwright/test";

test("Descriptive test name", async ({ page }) => {
  // Arrange: Set up test data and state
  const testData = { username: "user@example.com" };

  // Act: Perform the action
  await page.goto("/login");
  
  // Assert: Verify the result
  await expect(page).toHaveTitle("Dashboard");
});
```

### Best Practices

- One assertion focus per test
- Use descriptive test names
- Follow Arrange-Act-Assert pattern
- Clean up after tests
- Don't rely on test execution order
- Use Page Objects for UI tests

---

## 🤖 AI Feature Contributions

If adding or modifying AI features:

### Location Structure

```
ai/
├── [FeatureName].js          # Feature implementation
├── tests/
│   └── test-[FeatureName].js # Tests for feature
└── examples/
    └── example-[Feature].js   # Usage examples
```

### Documentation

- Add JSDoc comments
- Update `ai/README.md` with API documentation
- Provide code examples
- Include use cases

### API Key Handling

- Always use `process.env.ANTHROPIC_API_KEY`
- Never hardcode API keys
- Handle API limit errors gracefully

---

## 📖 Documentation

### What to Update

- README.md (if adding features)
- Package.json (if adding dependencies)
- ai/README.md (if modifying AI features)
- Code comments (complex logic)
- .env.example (new configuration)

### Documentation Format

```markdown
## Feature Name

**What it does:** Brief description

**Usage:**
\`\`\`javascript
code example
\`\`\`

**Parameters:**
- `param1` (string) - Description
- `param2` (boolean) - Description

**Returns:** Description
```

---

## 📦 Commits

### Commit Message Format

```
type(scope): brief description

Detailed explanation if needed. Context about why this change
was made and any relevant information.

Fixes #123
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style (no functionality change)
- `refactor:` - Code refactoring
- `test:` - Test additions/updates
- `perf:` - Performance improvements

### Examples

```
feat(ai): add edge case generation capability
fix(api): handle bearer token incorrectly in header
docs(readme): update AI integration section
test(playwright): add tests for login flow
```

---

## 📤 Submitting Changes

### Pull Request Process

1. **Update your branch**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Push your changes**
   ```bash
   git push origin feature/your-feature
   ```

3. **Open a Pull Request**
   - Clear title describing the change
   - Reference related issues (#123)
   - Describe what changed and why
   - Include testing notes

4. **PR Template**
   ```
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update

   ## Testing
   - [ ] Unit tests added
   - [ ] Manual testing completed
   - [ ] No new warnings

   ## Checklist
   - [ ] Code follows style guide
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

### PR Review Process

- At least one maintainer review required
- CI checks must pass
- Address feedback promptly
- Keep PR focused (avoid scope creep)

---

## ✅ Checklist Before Submitting

- [ ] Code follows project style guide
- [ ] Tests pass locally (`npm test`)
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] Commits have clear messages
- [ ] No merge conflicts
- [ ] No sensitive data committed
- [ ] `.env` file not committed
- [ ] Unnecessary files not included

---

## 🤝 Review Process

### What Reviewers Look For

- Code quality and readability
- Test coverage
- Documentation completeness
- Breaking changes
- Performance implications
- Security concerns

### Responding to Feedback

- Be open to suggestions
- Ask for clarification if needed
- Make requested changes promptly
- Reply to all comments

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Cucumber BDD](https://cucumber.io)
- [Git Best Practices](https://git-scm.com)
- [Anthropic API Docs](https://docs.anthropic.com)

---

## 📞 Getting Help

- **Issues**: Create a GitHub issue with questions
- **Discussions**: Use GitHub discussions for ideas
- **Direct Contact**: Reach out to [@Jintojose39](https://github.com/Jintojose39)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

## 🙏 Thank You

Your contributions help make Play2 better for everyone. We appreciate your effort and time!

Happy contributing! 🚀
