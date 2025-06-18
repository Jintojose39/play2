# 🧑‍🔬 Playwright Learning Sandbox

> **Purpose:** A hands‑on playground where I explore and document every Playwright feature I’m studying.  
> **Not** a production‑ready framework—that lives in a separate repo.

---

## 🔭 What you’ll find here

| Area explored | Example file/folder | Status |
|---------------|--------------------|--------|
| Basic page interactions (locators, waits) | `\tests\UIBasics.spec.js` | ✅ |
| Dropdowns (native & custom) | `\tests\variables.spec.js` | ✅ |
| File upload/download | `\tests\upload.spec.js` | ✅ |
| Frames & iframes | `\tests\frames.spec.js` |  ✅ |
| Multi‑tab / multi‑window flows | `\tests\multiTab.spec.js` | ✅ |
| Dynamic tables | `\tests\tableFilter.spec.js` | ✅ |
| Tagging | `\tests\tags.spec.js` | ✅ |
| Annotations | `\tests\annotations.spec.js` | ✅ |
| Reporting experiments (Allure, HTML) | `utils/reporting/` | ✅ |
| Web Elements | `\tests\webElements.spec.js` | ✅ |
| Date Picker | `\tests\datepicker3.spec.js` | ✅ |
| E2E Assignement | `\tests\assignment1.spec.js` | ✅ |
| Alerts | `\tests\alert.spec.js` | ✅ |
| Special Locators | `\tests\specialLocators.spec.js` | ✅ |
| Mouse Actions | `\tests\mouse.spec.js` | ✅ |
| API with Playwright | `\tests\api.spec.js` | 🔄 |
| CI experiments (GitHub Actions) | `.github/workflows/learning.yml` | 🔄 |

Legend: ✅ done 🔄 in‑progress 🕗 planned

---

## 🚀 Quick start

```bash
git clone https://github.com/Jintojose39/play2.git
cd play2
npm install
npx playwright test   # run everything
npx playwright test --grep "@dropdown"  # run a tagged slice
