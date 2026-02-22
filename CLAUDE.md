# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CyberClean™** is a cybersecurity regulatory remediation platform for financial institutions. It operationalizes a disciplined, evidence-driven model for closing regulatory findings (OCC/FDIC/Federal Reserve MRAs/MRIAs, consent orders, audit issues) while building sustainable cybersecurity capabilities.

This repository is in early/pre-code stage. The foundational specification is in `CyberClean_Delivery_Module_Description.pdf`.

## Domain Model

The platform is organized around five sequential delivery modules with cross-cutting governance:

| Module | Name | Purpose |
|--------|------|---------|
| 1 | Regulatory Trigger | Ingest and scope regulatory findings |
| 2 | Diagnose | Root cause analysis, control gap mapping, risk-based prioritization |
| 3 | Design | Control redesign/uplift, evidence standards, KCI/KRI definition |
| 4 | Deliver | Sprint-based remediation, evidence production, issue closure packages |
| 5 | Sustain | BAU transition, automated evidence collection, KCI/KRI monitoring |

**Core traceability chain:** Requirement → Risk → Control → Evidence → Metric → Audit

**Governance model:** Three Lines of Defense (1LOD/2LOD accountability) with Board and Executive oversight.

## Key Domain Concepts

- **MRA/MRIA**: Matters Requiring Attention / Matters Requiring Immediate Attention (regulatory findings)
- **KCI/KRI**: Key Control Indicators / Key Risk Indicators (ongoing monitoring metrics)
- **GRC**: Governance, Risk & Compliance (traceability alignment target)
- **Evidence artifacts**: Verifiable proof that controls are operating effectively — central to regulatory closure
- **Issue closure package**: Structured documentation submitted to regulators proving a finding is remediated
- **1LOD/2LOD**: First/Second Line of Defense — operational owners vs. risk/compliance oversight
- **Preventive vs. detective controls**: Design distinction that must be explicit in control blueprints

## Architecture Principles (from spec)

- Fix causes, not symptoms — all remediation traces back to validated root causes
- Controls are designed to operate, not just exist — operating effectiveness is required, not just design
- Progress must be measurable, visible, and defensible — every sprint produces evidence artifacts
- Sustainability is a first-class requirement — BAU ownership transition and repeat-finding prevention are explicit outputs
