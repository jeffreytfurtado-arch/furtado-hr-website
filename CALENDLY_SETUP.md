# Calendly Integration Setup

## Current Status
✅ Calendly is integrated into your contact page!

## Where Calendly Appears

1. **Contact Page Embed** - Full calendar widget at the bottom of `/contact` page
2. **Form Success Message** - "Schedule a Call Now" button after form submission

## How to Update Your Calendly URL

### Step 1: Get Your Calendly Link
1. Log into your Calendly account at https://calendly.com
2. Go to your event type (e.g., "30 Minute Meeting" or "Free HR Assessment")
3. Copy your scheduling link (looks like: `https://calendly.com/your-username/meeting-type`)

### Step 2: Update the Contact Page

Open `src/pages/contact.tsx` and find these two locations:

**Location 1: Success Message Button (around line 123)**
```tsx
<a 
  href="https://calendly.com/precisehr"  // ← Change this URL
  target="_blank" 
  rel="noopener noreferrer"
>
```

**Location 2: Embedded Calendar Widget (around line 373)**
```tsx
<div className="calendly-inline-widget" 
  data-url="https://calendly.com/precisehr?hide_gdpr_banner=1&primary_color=8b5cf6"  // ← Change this URL
  style={{ minWidth: '320px', height: '700px' }}
/>
```

### Step 3: Customize Colors (Optional)

The embedded calendar uses your brand color (`primary_color=8b5cf6` which is purple).

To change it:
1. Pick a color in hex format (without the #)
2. Update the `primary_color` parameter in the data-url

Example:
- Purple: `primary_color=8b5cf6` (current)
- Blue: `primary_color=3b82f6`
- Green: `primary_color=10b981`

## Testing

1. Go to your contact page: `/contact`
2. Scroll down to see the embedded calendar
3. Submit the contact form and click "Schedule a Call Now"
4. Both should open your Calendly scheduling page

## Placeholder URL

Currently using: `https://calendly.com/precisehr`

This is a placeholder - replace it with your actual Calendly URL!
