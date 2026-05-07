# XIDIGIS Intelligence Operations Checklist

This document provides a standard operating procedure (SOP) for analysts reviewing regional intelligence.

## Daily Review Process

### 1. Monitor Composite Risk
- Open the **Intelligence Hub**.
- Identify regions in **Orange (Severe)** or **Red (Critical)** status.
- Review the indicator breakdown in the side panel.

### 2. Verify Alerts
- Check the **Active Alerts** section.
- Cross-reference automated alerts with local field reports if available.
- Ensure the rationale matches the observed data anomalies.

### 3. Review Related Research
- For critical regions, review existing **Research Papers** or **Policy Briefs** to understand structural vulnerabilities (e.g., "Drought Resilience in Eastern Regions").

## Incident Response

### Override Levels
If automated scoring does not reflect current field reality (e.g., a sudden policy intervention or unreported conflict):
1. Navigate to the **Supabase Dashboard**.
2. Locate the relevant `indices` record.
3. Update the `metadata` to include an `override_reason`.
4. Adjust the `value` as necessary (Document carefully).

### Publishing Warnings
To escalate a warning into a public advisory:
1. Create a new **Policy Brief** in the `publications` table.
2. Link the brief to the specific `region_id`.
3. The brief will automatically appear in the Intelligence Map detail panel for that region.

## Weekly Reporting
- Export the latest indices dataset via the **Export** button.
- Synthesize trends for the weekly Regional Security & Climate briefing.
