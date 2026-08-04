# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-08-04

### Added
- feat(security): add pre-tool-use hook blocking destructive bash commands ([`2d81a8c`])
- feat(template): add opinionated CLAUDE.md template for Next.js + SQLite SaaS ([`e197740`])
- feat(api): add GET /contracts/{id}/stats endpoint with per-contract totals and type breakdown ([`f5e851e`])

### Fixed
- fix(middleware): protect middleware chain builder with RWMutex during concurrent updates ([`0b40b4f`])
- fix(api): attach authMiddleware to uploadRoutes POST endpoint ([`6af6b4d`])

### Changed
- refactor(api): extend /readyz endpoint to report per-dependency health status ([`f5e851e`])
