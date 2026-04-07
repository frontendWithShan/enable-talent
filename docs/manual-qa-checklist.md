# Manual QA Checklist

Use this checklist after migrations, imports, or production deploys.

## Blogs

- Admin blog list loads for `super_admin`, `editor`, and `guest_writer`
- Guest writer cannot publish
- Internal article create/edit/publish works
- External link create/edit/publish works
- Published posts appear on `/blogs`
- External links open the original source
- Public article detail pages render stored content correctly

## Careers

- Careers admin list loads for `super_admin` and read-only for `editor`
- `super_admin` can create draft roles
- `super_admin` can publish and archive roles
- Published active roles appear on `/careers`
- Public role detail pages load by slug

## Career applications

- Public application form submits successfully
- Resume upload accepts valid PDF/DOC/DOCX files
- Invalid resume type is rejected clearly
- New applications appear in `/admin/job-applications`
- Admin can update status, add notes, and open the stored resume

## Inquiries

- Public contact submission appears in `/admin/inquiries?type=contact`
- Public demo submission appears in `/admin/inquiries?type=demo`
- Public consultation submission appears in `/admin/inquiries?type=consultation`
- Filters, search, and detail updates work

## Access control

- Unauthenticated access to `/admin/*` redirects to login
- `editor` cannot access `/admin`, `/admin/inquiries`, `/admin/job-applications`, `/admin/newsletter`, or `/admin/volunteer-applications`
- `guest_writer` can access only blog admin routes allowed by policy
- Public clients cannot directly read or manage inquiries, applications, resumes, or media records

## Accessibility

- Keyboard-only walkthrough completed for changed admin and public flows
- Focus states verified
- Contrast checked
- Zoom and reflow checked at 200%
- Reduced-motion behavior checked
- Basic screen-reader pass completed for changed flows
