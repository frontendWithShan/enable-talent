# ENABLED TALENT - INTERNAL

## CTO Approval Brief - Web Platform Modernization

Prepared for: CTO  
Date: March 31, 2026  
Status: For Approval

## WHAT THIS DOCUMENT IS

This document requests approval to evolve the current website codebase from a
marketing-heavy frontend into a fullstack web platform layer that supports:

- structured content management
- internal careers and applicant tracking workflows
- secure admin operations
- future tenant-aware knowledge experiences
- future company-specific chatbot workflows

This is not a replacement for the core product platform evolution plan.
It is the web experience and content operations layer that will sit beside it.

## WHAT WE ARE APPROVING

We are approving a phased modernization of this repository around:

- `Next.js 16` App Router
- `Supabase` for auth, Postgres, storage, and row-level access control
- `Tiptap` OSS core for Medium-style editorial authoring
- `OpenAI Responses API` for later retrieval-grounded chatbot workflows

## WHY THIS WORK IS NEEDED

The current repository is increasingly carrying product-like responsibilities,
but it still behaves like a static or semi-static marketing site.

Current pain points:

- content management is limited and inconsistent
- admin auth is not production-grade
- blog and careers workflows are not modeled as durable platform features
- data and content operations are fragmented
- the codebase has no clean path to knowledge ingestion or grounded chat

## THE STRATEGIC INTENT

This work aligns with the broader company direction of moving away from a
simple marketplace presentation layer and toward a configurable infrastructure
experience.

For this repository, that means:

- making the web layer operationally real
- treating content and careers as managed system data
- preparing for tenant-aware experiences without overloading this phase
- separating platform capability from one-off page implementations

## THE ARCHITECTURAL SHIFT

| TODAY | TOMORROW |
| --- | --- |
| Marketing-heavy frontend | Fullstack web platform layer |
| Ad hoc admin workflows | Secure authenticated admin workflows |
| Limited content editing | Structured editorial publishing |
| Form submissions as isolated utilities | Unified operational data model |
| No document knowledge layer | Knowledge-ready document pipeline |
| Generic website support potential | Future tenant-aware assistant support |

## WHAT WILL BE BUILT

### Phase 1 - Platform Foundation

- Supabase auth and role-based admin access
- core relational schema for content, career postings, applications, inquiries, and media
- storage buckets for blog images, resumes, and assets
- replacement of fragile admin patterns with server-side controlled workflows
- role-based access model with the following roles:

| Role | Blog | Careers | Admin Panel | User Management |
| --- | --- | --- | --- | --- |
| Super Admin | Full CRUD, publish and unpublish | Full CRUD | Full access | Can invite and remove all roles |
| Editor (marketing, tech, etc.) | Full CRUD, publish | View only | Blog section only | No |
| Guest Writer | Draft only, cannot publish | No access | Own drafts only | No |

Super Admin invites users via email. Role assignment is enforced at the database
level through Supabase Row-Level Security policies. Editors carry a team tag
(e.g. marketing, engineering) for content attribution, but share the same
permission set.

### Phase 2 - Content and Careers Operations

- Tiptap-based article editor with draft and publish workflow
- blog CMS supporting two content types:
  - articles: full posts authored internally using the Tiptap editor
  - external links: curated third-party content (press mentions, partner articles)
    that appear in the blog grid but open the original source in a new tab
- careers CMS for internal career postings
- inquiry and submission management
- redesigned public blog and careers experiences on live data
- guest writers can create drafts only; an editor or super admin must review and
  publish

### Phase 3 - Knowledge Readiness

- company document upload
- parsing, chunking, and embedding pipeline
- tenant-aware knowledge document model
- retrieval-ready storage for future assistants

### Phase 4 - Tenant-Aware Assistant Layer

- grounded chatbot using approved documents
- company-specific retrieval scopes
- citation-first answer strategy
- escalation to human support when confidence is low

## WHAT THIS WORK EXPLICITLY DOES NOT DO

This proposal does not attempt to replace the main product engineering roadmap.

Out of scope:

- rewriting the core product backend
- redefining the company-wide auth strategy for the main platform
- rebuilding all tenant portal flows in this repository
- implementing full institutional white-label delivery in this phase
- shipping a company-specific chatbot before the knowledge pipeline is stable

## DESIGN PRINCIPLES

The implementation should follow these principles:

- tenant awareness without unnecessary early complexity
- secure defaults for auth, storage, and content access
- one reusable operational model instead of many page-level exceptions
- editorial quality equal to modern B2B publishing tools
- phased delivery so value is created before advanced AI layers are added

## EXPECTED OUTCOMES

At the end of the approved scope, this repository should provide:

- a real admin layer instead of a pseudo-admin surface
- structured publishing and content operations
- durable careers and inquiry workflows
- a stronger public-facing product and content surface
- a clean base for later tenant-scoped knowledge and assistant features

## KEY RISKS

### Risk 1 - Scope Creep

There is a risk that this work tries to solve both the website modernization
and the core platform transformation at the same time.

Mitigation:

- keep this proposal scoped to the web experience layer
- treat tenant-aware knowledge and chat as later phases
- keep the main product platform plan separate

### Risk 2 - Auth and Data Fragmentation

If the web layer evolves with no clean operational model, the result will be
more fragmented systems rather than fewer.

Mitigation:

- centralize auth, storage, and content workflows
- use one shared schema and role model for this repository

### Risk 3 - AI Before Data Readiness

A chatbot added before content quality, permissions, and document grounding are
stable will create poor answers and operational risk.

Mitigation:

- phase AI after the content and knowledge base are stable
- use retrieval grounding rather than generic responses

## APPROVAL REQUEST

Approval is requested for:

1. The scope boundary
This repository will be modernized as a web platform layer, not as a total
replacement for the main product platform.

2. The stack
Approve `Next.js + Supabase + Tiptap + OpenAI` for this repository's
modernization path.

3. The phased sequence
Approve foundation first, then CMS and workflows, then knowledge ingestion,
then chatbot.

4. The operating principle
Treat this codebase as a reusable web experience platform, not only as a set of
marketing pages.

## SUCCESS CRITERIA

This proposal should be considered successful if it delivers:

- secure admin access
- live content and careers management
- a publishable article workflow
- operational inquiry handling
- a knowledge-ready architecture for future assistant use

## RECOMMENDED DECISION

Approve the modernization of this repository as a phased web platform program,
with immediate focus on auth, data model, CMS, and operations, while deferring
tenant-specific assistant behavior until the knowledge layer is ready.
