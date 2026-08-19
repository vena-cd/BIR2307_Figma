# BIR 2307 Generator

## Professional B2B Financial Workflow UX/UI Redesign

Redesign this application as a **professional B2B financial workflow SaaS product for Philippine organizations that prepare BIR Form 2307 certificates**.

This is an existing working application.

Do NOT redesign it as a generic accounting dashboard.

Do NOT invent unnecessary features.

Preserve and showcase the application's existing functionality while substantially improving the information architecture, workflow UX, visual hierarchy, and interaction design.

The application currently processes Excel workbooks, validates and recomputes EWT, groups transactions by payee and quarter, generates certificates from the official BIR template, tracks certificate status, supports signed-copy uploads, provides search and filtering, and records audit events.

The target user is a **bookkeeper, accountant, finance officer, or administrative staff member** who repeatedly performs BIR certificate preparation.

The user is not exploring the software.

The user is trying to get work done quickly and confidently.

---

# 1. DESIGN EXPERT PERSONA

Act as a:

**Principal Product Designer + UX Researcher specializing in B2B SaaS, fintech/accounting software, compliance workflows, document management, and data-heavy enterprise applications.**

Think like a designer who has designed:

* Accounting software
* Payroll systems
* Tax platforms
* Financial operations software
* Document-processing platforms
* Enterprise dashboards
* Compliance systems

Prioritize:

1. Workflow efficiency
2. Information hierarchy
3. Trust
4. Error prevention
5. Auditability
6. Data clarity
7. Minimal navigation
8. Progressive disclosure
9. Fast repeated operations

Do NOT prioritize visual novelty over usability.

The interface should feel like software a finance professional could use every quarter without needing training.

---

# 2. CORE UX PRINCIPLE

Design around the user's real job:

> "I have transaction data. I need to verify it, generate accurate 2307 certificates, review them, send them, collect signed copies, and prove what happened."

Therefore the primary product workflow should be:

**IMPORT → REVIEW → GENERATE → TRACK → COMPLETE**

Not:

**Uploads → Mapping → Transactions → Certificates → Search → Logs**

Do not expose the internal software architecture through the navigation.

The interface should hide technical complexity and expose the user's workflow.

---

# 3. PRIMARY NAVIGATION

Use a very small persistent sidebar.

Primary navigation:

### Overview

The operational dashboard.

### Certificates

The main certificate workspace.

### Payees

Payee and transaction information.

### Reports

Quarterly summaries, exports, and filing information.

### More

Low-frequency administrative functions.

At the bottom:

* Notifications
* Settings
* User profile

DO NOT create permanent navigation endpoints for:

* Uploads
* Mapping
* Validation
* Transactions
* PDF generation
* Audit logs
* Signed documents

These should be contextual workflows inside the main application.

The goal is a maximum of approximately 4–5 primary destinations.

---

# 4. GLOBAL APPLICATION SHELL

Create a persistent desktop web application shell.

### Left Sidebar

Logo:

**2307**

Product name:

**BIR 2307 Generator**

Navigation:

Overview
Certificates
Payees
Reports
More

Bottom:

Settings
Help
User account

### Top Bar

Include:

Global Search
Quarter selector
Notifications
Quick Action
User profile

Global search should support:

* Payee name
* TIN
* Certificate number
* BILL NO.
* Quarter
* Invoice/reference information

Use a keyboard shortcut such as:

**Ctrl + K**

---

# 5. VISUAL DIRECTION

Create a polished financial SaaS interface.

Visual character:

* Professional
* Calm
* Precise
* Trustworthy
* Modern
* Minimal
* Information-dense but readable

Use a restrained neutral interface with one strong brand accent.

Avoid:

* Excessive gradients
* Excessive rounded cards
* Glassmorphism
* Huge dashboard illustrations
* Marketing-style visual decoration
* Too many colors
* Excessive shadows
* Neon colors
* Generic AI dashboard aesthetics

Typography should prioritize readability.

Use clear hierarchy:

Page title
Section title
Metadata
Body text
Table data
Secondary information

Use strong alignment and spacing.

---

# 6. OVERVIEW DASHBOARD

The dashboard should NOT simply show vanity metrics.

It should answer:

> "What needs my attention right now?"

Header:

**Good morning, [User].**

Subtext:

**Here's what needs your attention this quarter.**

Primary KPI cards:

### Certificates

Generated this quarter

### For Review

Certificates requiring attention

### Forwarded

Certificates already sent

### Completed

Signed copies received

### Exceptions

Transactions or certificates with issues

Use meaningful counts.

Below the KPI row:

---

## Workflow Progress

Show the current quarter as a horizontal workflow:

**Imported → Validated → Generated → Forwarded → Signed**

Show the number of certificates in each stage.

Allow clicking a stage to filter the certificate workspace.

---

# 7. ATTENTION CENTER

Create a prominent section:

## Needs Your Attention

Examples:

**12 transactions need review**

"2 rows have mismatched EWT values."

CTA:

**Review transactions**

---

**3 certificates are missing signed copies**

CTA:

**View certificates**

---

**Import requires column mapping**

CTA:

**Continue import**

---

**Certificate contains many ATC line items**

CTA:

**Review certificate**

Use contextual actions.

Do not send users to an unrelated page.

---

# 8. RECENT ACTIVITY

Show:

* Recent certificate generation
* Uploads
* Status changes
* Signed-copy uploads
* Payee edits

Each row shows:

Time
User
Action
Object
Status

Example:

**Maria Santos generated 24 certificates**

2 hours ago

**Q3 2026**

View batch

---

# 9. CERTIFICATES — MAIN WORKSPACE

This is the primary screen.

Create a powerful table-based workspace.

Header:

**Certificates**

Subtext:

**Prepare, review, and track BIR 2307 certificates.**

Primary button:

**+ New Import**

Secondary action:

**Export**

---

## Filters

Create a compact filter bar.

Search

Quarter

Status

Payee

Date range

Issue status

Do not make filters consume excessive vertical space.

Use a "Filters" button for secondary filters.

---

# 10. CERTIFICATE TABLE

Columns:

Checkbox

Payee

TIN

Quarter

Amount Paid

EWT

Certificate Status

Last Updated

Actions

Status badges:

Draft
Generated
Forwarded
Signed
Void

The artifact's current lifecycle is draft → generated → forwarded → completed_signed, with void available from any stage. Preserve this workflow but present it with clearer human-readable labels.

Use masked TIN values in table views.

Example:

123-456-***-789

Show the full TIN only inside the certificate detail view.

---

# 11. CERTIFICATE DETAIL DRAWER

When a certificate is selected, open a **large right-side detail drawer** rather than forcing navigation to a new page.

The drawer should show:

### Certificate Header

Payee name

Masked TIN

Quarter

Certificate number

Status

Primary action

**Open Certificate**

Secondary actions:

Download
Print
Void
Upload Signed Copy

---

## Certificate Summary

Show:

Amount Paid
Tax Base
EWT
ATC
Date Generated

---

## Status Timeline

Example:

Generated

19 Aug 2026
By Maria Santos

↓

Forwarded

20 Aug 2026
By John Cruz

↓

Signed Copy Received

24 Aug 2026
By Maria Santos

The existing system already maintains append-only status history with optional notes, so make this auditability visible and understandable.

---

# 12. CERTIFICATE PREVIEW

Create an in-app PDF preview workspace.

Use a split-screen layout:

LEFT:

Certificate metadata and actions

RIGHT:

Large preview of the official BIR 2307 document

Actions:

Download PDF
Print
Upload Signed Copy

Show:

**Official BIR Template**

as an informational label.

Do not redesign the actual government form.

The application's real behavior is to preserve the official template and overlay computed values onto it. The Figma design should represent that accurately.

---

# 13. IMPORT WORKFLOW

This should be one of the most important UX flows.

Click:

**+ New Import**

Open a guided import workspace.

Do NOT make import a separate permanent navigation page.

Use a four-stage wizard:

### 01 Upload

Upload Excel file.

Show:

File name
File size
Sheet name
Upload progress

Supported formats:

.xlsx
.xls

Display file constraints.

---

### 02 Map

Display:

Excel columns on the left

System fields on the right

Example:

Excel Column
→
System Field

BILL NO.
→ BILL NO.

TIN
→ Payee TIN

AMOUNT PAID
→ Amount Paid

EWT
→ Tax Withheld

Use intelligent auto-mapping.

Show:

**12 of 12 fields mapped**

Use confidence indicators:

Auto-matched
Previously saved
Fuzzy match
Needs attention

The existing application already uses four mapping strategies and reusable mapping profiles, so make this intelligence visible rather than presenting mapping as a technical form.

---

# 14. IMPORT VALIDATION

After mapping:

Show validation results before generating anything.

Headline:

**Your file is ready to review**

Summary:

2,438 rows
2,401 valid
31 warnings
6 errors

Use three groups:

### Ready

Green status

### Warnings

Amber status

### Errors

Red status

Never hide validation results.

---

# 15. TRANSACTION REVIEW

Allow users to inspect problematic records without re-uploading the entire spreadsheet.

This directly addresses a major workflow pain point: the current application requires correcting the source spreadsheet and re-uploading when a single row is wrong.

Create a table:

Payee
TIN
BILL NO.
Amount Paid
EWT
ATC
Issue

Allow:

Inline editing
Fix
Ignore
Mark reviewed

Open a transaction detail drawer for complex records.

Show:

Original spreadsheet value
Computed value
Difference

Example:

Spreadsheet EWT:
₱4,250.00

System calculated:
₱4,300.00

Difference:
+₱50.00

Status:

**Requires review**

---

# 16. DUPLICATE REVIEW

If duplicate BILL NO. values are detected, create a dedicated review state.

Header:

**Potential duplicates found**

Explain:

"These records share the same BILL NO. Review whether they are accidental duplicates or legitimate multi-line entries."

Use grouped cards.

Actions:

Merge
Keep separate
Ignore

The system already distinguishes accidental duplicates from legitimate multi-line entries, so preserve this concept in the UX.

---

# 17. GENERATE CERTIFICATES

After validation:

Display a final confirmation step.

Header:

**Ready to generate certificates**

Show:

Payees:
245

Certificates:
218

Total Amount Paid:
₱X,XXX,XXX.XX

Total EWT:
₱XXX,XXX.XX

Exceptions:
0

Primary action:

**Generate 218 Certificates**

Before generating:

Show confirmation:

"Certificates will be created for 218 payee-quarter combinations."

---

# 18. GENERATION PROGRESS

Create a professional progress state.

Example:

Generating certificates...

██████████████░░░░ 82%

179 / 218 certificates

Show a small activity log:

✓ Santos Trading
✓ ABC Cooperative
✓ Maria Pharmacy

Currently processing:

XYZ Services

Do not leave the user staring at a loading spinner.

---

# 19. GENERATION COMPLETE

Show a strong completion state.

### 218 Certificates Generated

All certificates were generated successfully.

Actions:

**Review Certificates**

**Download Filing Packet**

**Return to Overview**

Secondary:

View generation log

---

# 20. PAYEES

The Payees page should focus on searchable recurring business entities.

Table:

Payee
TIN
Certificates
Last Certificate
Current Quarter
Outstanding
Status

Clicking a payee opens a detail drawer.

Show:

Payee information

Certificate history

Quarter history

Transactions

Audit history

Do NOT create separate pages for each of these.

Use tabs inside the drawer or workspace.

---

# 21. PAYEE DETAIL

Header:

Payee name

TIN

Address

Status

Actions:

Edit
Create Certificate
View History

Tabs:

Overview
Transactions
Certificates
History

Show quarterly certificate activity visually.

Example:

Q1 2026
Completed

Q2 2026
Completed

Q3 2026
Generated

Q4 2026
Not Started

---

# 22. REPORTS

Create one Reports destination.

Do not create multiple reporting pages.

Reports should include:

### Quarterly Summary

Certificates

Payees

Total amount paid

Total EWT

Status distribution

---

### Filing Packet

Allow users to select:

Quarter
Certificate status

Then:

Generate filing packet

Export Excel

Download PDFs

---

### Export

Provide:

CSV

Excel

PDF packet

The existing application currently lacks data export, so present export capability as a major productivity feature.

---

# 23. AUDIT LOG

Do NOT create an Audit Log item in the primary sidebar.

Place it under:

More → Audit Log

Design it as a professional event timeline/table.

Columns:

Timestamp
User
Action
Record
Category
Severity

Allow filtering.

Show detail drawer with:

Before
After

for edited records.

The application already logs edits as before/after differences and has nine event categories and three severities.

---

# 24. SETTINGS

Settings should contain:

Organization

Payor information

Users & Roles

Mapping Profiles

Certificate Preferences

Security

Backup

Do NOT expose these as primary navigation.

The onboarding flow should specifically require the organization's real payor identity before certificate generation, since the existing audit identifies the seeded placeholder payor identity as a critical problem.

---

# 25. FIRST-RUN ONBOARDING

When a new organization opens the system for the first time:

Show:

## Let's set up your organization

Step 1
Organization name

Step 2
Registered address

Step 3
TIN

Step 4
Authorized user

Step 5
Upload first Excel file

Do not show the full application before setup is complete.

Show progress:

1 Organization
2 Payor
3 Import
4 Review
5 Generate

---

# 26. USER ROLES

Design role-aware access.

Roles:

### Preparer

Can:

Import
Review
Generate
Track

### Reviewer

Can:

Review
Approve
Generate
View reports

### Administrator

Can:

Manage users
Settings
Backups
Audit logs

The artifact identifies the current shared-login model as a limitation because the audit log cannot reliably tell which staff member performed an action. The redesign should therefore visually accommodate individual accounts and roles.

---

# 27. BACKUP STATUS

Create a subtle system-health indicator.

Example:

**Backup**

Last backup:
Today, 02:00 AM

Status:
Protected

Use this in Settings or an administrative area.

Do NOT put a giant backup widget on the main dashboard.

---

# 28. ERROR HANDLING

Design professional error states.

Examples:

Invalid Excel file

Unmapped column

Invalid TIN

EWT mismatch

Duplicate transaction

Certificate generation failure

Signed copy upload failure

Each error should provide:

What happened

Why it happened

What to do next

Primary action

Example:

### EWT mismatch

"The spreadsheet reports ₱4,250.00, while the system calculated ₱4,300.00."

Actions:

Review transaction

Use spreadsheet value

Keep computed value

Do not merely display:

"Error."

---

# 29. CERTIFICATE OVERFLOW WARNING

Design a specific warning for certificates with too many ATC line items.

The current system's fixed-height certificate table can silently clip or overlap when there are many line items, so the UX should detect and warn before generation.

Example:

### Certificate requires review

"This payee has 14 ATC line items. The certificate may require additional pages."

CTA:

Review certificate

Use a warning state BEFORE PDF generation.

---

# 30. SIGNED COPY WORKFLOW

Inside the certificate detail:

Show:

### Signed Copy

Status:

Not received

Button:

**Upload Signed Copy**

After upload:

Show:

Signed copy received

Date

Uploaded by

File name

Button:

View signed copy

The existing workflow automatically advances a certificate when a signed copy is uploaded, so visually communicate that state transition.

---

# 31. BULK ACTIONS

Users should be able to select multiple certificates.

Bulk actions:

Mark as Forwarded

Download

Export

Void

Upload signed copies

Do not make users open certificates one by one for repetitive operations.

---

# 32. RESPONSIVE BEHAVIOR

Desktop is the primary target.

Design for:

1440 × 900

1280 × 800

Also demonstrate tablet behavior.

Do not attempt to make every complex table work identically on mobile.

On smaller screens:

Collapse sidebar.

Convert secondary panels into drawers.

Prioritize:

Payee
Status
Amount
Action

---

# 33. DESIGN SYSTEM

Create a complete Figma design system.

Include:

Color tokens
Typography
Spacing
Grid
Buttons
Inputs
Dropdowns
Search
Tables
Cards
Badges
Status indicators
Tabs
Drawers
Modals
Alerts
Toast notifications
Pagination
Date pickers
Upload components
File previews
Timelines
Empty states
Loading states
Skeletons
Error states

Create component variants for:

Default
Hover
Focus
Disabled
Loading
Error
Success

---

# 34. STATUS SYSTEM

Use consistent status semantics throughout the entire application.

Draft
Neutral

Generated
Informational

Forwarded
Blue/active

Completed / Signed
Success

Warning
Requires attention

Error
Problem

Void
Destructive/neutral

Do not use color alone to communicate state.

Pair colors with:

Icon
Text
Shape

---

# 35. TABLE UX

Because this is financial software, tables are important.

Support:

Sorting

Filtering

Column alignment

Sticky headers

Row selection

Bulk actions

Pagination

Column density

Hover actions

Keyboard navigation

Use tabular numbers for financial values.

Align:

Currency values right.

Dates consistently.

Text left.

Status centered or compact.

---

# 36. EMPTY STATES

Every major workspace must have an intentional empty state.

Examples:

No certificates yet

No payees yet

No outstanding certificates

No validation errors

No audit events

No reports available

Each empty state must tell the user:

What is missing

Why it matters

What they can do

---

# 37. LOADING STATES

Do not use generic spinners everywhere.

Use skeletons for:

Tables

Dashboards

Certificate details

Search results

Use progress indicators for:

Excel processing

Validation

Certificate generation

File uploads

---

# 38. MICROCOPY

Use clear financial-software language.

Avoid:

"Oops!"

"Uh-oh!"

"Magic!"

"Let's crunch some numbers!"

Prefer:

"Validation complete."

"3 records require review."

"218 certificates are ready to generate."

"Signed copy received."

Professional, concise, confidence-building language.

---

# 39. KEY USER JOURNEYS TO PROTOTYPE

Create high-fidelity clickable prototypes for these exact workflows.

### Journey 1 — First use

Login

→ Organization setup

→ Upload Excel

→ Auto-map columns

→ Review validation

→ Generate certificates

→ Completion

---

### Journey 2 — Normal quarterly workflow

Overview

→ New Import

→ Upload

→ Mapping

→ Validation

→ Review exceptions

→ Generate

→ Certificate workspace

---

### Journey 3 — Fix a problematic transaction

Certificates

→ Review issues

→ Select transaction

→ Detail drawer

→ Edit value

→ Recalculate

→ Mark reviewed

---

### Journey 4 — Review certificate

Certificates

→ Select certificate

→ Detail drawer

→ Open preview

→ Inspect official 2307

→ Download

---

### Journey 5 — Receive signed copy

Certificates

→ Select generated certificate

→ Upload signed copy

→ Status changes to Completed / Signed

---

### Journey 6 — Prepare quarterly filing packet

Reports

→ Select quarter

→ Review certificate totals

→ Export Excel

→ Download filing packet

---

# 40. MOST IMPORTANT UX RULE

Do NOT make the application feel like:

"Here are all the things the database can do."

Make it feel like:

"Here's what you need to do next."

The interface should constantly answer:

### Where am I?

### What happened?

### What needs attention?

### What should I do next?

### Is the operation complete?

This should guide every screen.

---

# 41. FINAL FIGMA DELIVERABLE

Generate the Figma project with these sections:

## 01 — Foundations

Color
Typography
Spacing
Icons
Grid

## 02 — Components

Buttons
Forms
Tables
Drawers
Modals
Badges
Alerts
Upload
Timeline

## 03 — Application Shell

Sidebar
Topbar
Search
User menu

## 04 — Overview

Dashboard
Attention center
Workflow status

## 05 — Import Workflow

Upload
Mapping
Validation
Transaction review
Duplicate review

## 06 — Certificates

Certificate table
Certificate drawer
Certificate preview
Bulk actions

## 07 — Payees

Payee table
Payee drawer
History

## 08 — Reports

Quarterly summary
Exports
Filing packet

## 09 — Administration

Settings
Users
Roles
Audit log
Backup

## 10 — States

Empty
Loading
Success
Warning
Error
Confirmation

## 11 — Prototypes

First import
Certificate generation
Issue resolution
Signed-copy workflow
Quarterly filing workflow

---

# 42. FINAL QUALITY BAR

The finished design should look like a serious commercial B2B SaaS product.

Reference the usability standards of mature enterprise financial software.

The product should be:

**Less navigation-heavy than a traditional accounting system.**

**More workflow-oriented than a CRUD application.**

**More information-dense than a consumer application.**

**More trustworthy than a generic dashboard template.**

The visual result should communicate:

> "This software handles important financial records, catches mistakes, and gives me confidence that my 2307 certificates are properly prepared."

Do not sacrifice usability for visual aesthetics.

Do not add unnecessary features.

Do not create unnecessary pages.

Prioritize the core workflow:

# Import → Review → Generate → Track → Complete
