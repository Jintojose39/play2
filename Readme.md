# 🧑‍🔬 Playwright Learning Sandbox

> **Purpose:** A hands‑on playground where I explore and document every Playwright feature I’m studying.  
> **Not** a production‑ready framework—that lives in a separate repo.

---

## 🔭 What you’ll find here

| Area explored | Example file/folder | Status |
|---------------|--------------------|--------|
| Basic page interactions (locators, waits) | `tests/01-basic-locators.spec.ts` | ✅ |
| Dropdowns (native & custom) | `tests/02-dropdowns.spec.ts` | 🔄 |
| File upload/download | `tests/03-file-upload-download.spec.ts` | 🔄 |
| Frames & iframes | `tests/04-frames.spec.ts` | 🔄 |
| Multi‑tab / multi‑window flows | `tests/05-windows.spec.ts` | 🕗 |
| Dynamic tables | `tests/06-tables.spec.ts` | 🕗 |
| Test annotations & tagging | `tests/@smoke,@regression` | ✅ |
| Reporting experiments (Allure, HTML) | `utils/reporting/` | 🔄 |
| CI experiments (GitHub Actions) | `.github/workflows/learning.yml` | 🕗 |

Legend: ✅ done 🔄 in‑progress 🕗 planned

---

## 🚀 Quick start

```bash
git clone https://github.com/Jintojose39/play2.git
cd play2
npm install
npx playwright test   # run everything
npx playwright test --grep "@dropdown"  # run a tagged slice
