/**
 * Template variable replacement utility
 * Handles replacement of template variables with actual guest data
 */

export interface GuestData {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  numberOfGuests?: number | null;
  session?: string | null;
  tableNumber?: string | null;
  notes?: string | null;
  guestCategory?: {
    name: string;
  } | null;
  event?: {
    name: string;
  } | null;
}

/**
 * Maps template variable names to guest data fields
 */
const VARIABLE_MAPPING: Record<string, (guest: GuestData) => string> = {
  'FULLNAME': (guest) => guest.name || '',
  'EMAIL': (guest) => guest.email || '',
  'ADDRESS_INSTITUTION': (guest) => guest.address || '',
  'CATEGORY': (guest) => guest.guestCategory?.name || '',
  'TABLE_NUMBER': (guest) => guest.tableNumber || '',
  'NOTES': (guest) => guest.notes || '',
  'TOTAL_PACK': (guest) => guest.numberOfGuests?.toString() || '1',
  'LINK_WEB_INV_PERSONAL': (guest) => `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/invitation/${guest.id}`,
  'LINK_RSVP': (guest) => `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/rsvp/${guest.id}`,
  'LINK_WEB_GENERAL': (guest) => `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/event/${guest.event?.name || 'event'}`,
};

/**
 * Replaces template variables in content with actual guest data
 * Supports both formats:
 * - *##_VARIABLE_NAME_##* (from template form)
 * - {{name}} (legacy format)
 * 
 * @param content - The template content with variables
 * @param guest - The guest data to use for replacement
 * @returns The content with variables replaced
 */
export function replaceTemplateVariables(content: string, guest: GuestData): string {
  let processedContent = content;

  // Replace new format variables: *##_VARIABLE_NAME_##*
  processedContent = processedContent.replace(/\*##_([A-Z_]+)_##\*/g, (match, variableName) => {
    const replacementFunction = VARIABLE_MAPPING[variableName];
    if (replacementFunction) {
      return replacementFunction(guest);
    }
    // If variable not found, return the original match
    console.warn(`Unknown template variable: ${variableName}`);
    return match;
  });

  // Replace legacy format variables: {{name}}
  processedContent = processedContent.replace(/\{\{name\}\}/g, guest.name || '');
  processedContent = processedContent.replace(/\{\{email\}\}/g, guest.email || '');

  return processedContent;
}

/**
 * Replaces template variables in both subject and content
 * 
 * @param subject - The email subject with variables
 * @param content - The email content with variables
 * @param guest - The guest data to use for replacement
 * @returns Object with processed subject and content
 */
export function replaceEmailVariables(
  subject: string,
  content: string,
  guest: GuestData
): { subject: string; content: string } {
  return {
    subject: replaceTemplateVariables(subject, guest),
    content: replaceTemplateVariables(content, guest)
  };
}

/**
 * Gets a list of all available template variables
 * 
 * @returns Array of variable names that can be used in templates
 */
export function getAvailableVariables(): string[] {
  return Object.keys(VARIABLE_MAPPING);
}

/**
 * Validates if a template contains valid variables
 * 
 * @param content - The template content to validate
 * @returns Object with validation result and any unknown variables
 */
export function validateTemplateVariables(content: string): {
  isValid: boolean;
  unknownVariables: string[];
} {
  const variableMatches = content.match(/\*##_([A-Z_]+)_##\*/g) || [];
  const unknownVariables: string[] = [];

  variableMatches.forEach(match => {
    const variableName = match.replace(/\*##_|_##\*/g, '');
    if (!VARIABLE_MAPPING[variableName]) {
      unknownVariables.push(variableName);
    }
  });

  return {
    isValid: unknownVariables.length === 0,
    unknownVariables
  };
}