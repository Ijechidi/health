import { CreateOrganizationInput } from './types';
import { ValidationError } from './errors';

export const validateOrganizationInput = (
  input: CreateOrganizationInput
): void => {
  if (!input.name || input.name.trim() === '') {
    throw new ValidationError('Le nom de l\'organisation est requis');
  }

  if (input.domain && input.domain.trim() === '') {
    throw new ValidationError('Le domaine ne peut pas être vide');
  }

  if (input.name.length > 100) {
    throw new ValidationError('Le nom ne peut pas dépasser 100 caractères');
  }

  if (input.domain && input.domain.length > 255) {
    throw new ValidationError('Le domaine ne peut pas dépasser 255 caractères');
  }
};

export const sanitizeDomain = (domain?: string): string | null => {
  if (!domain) return null;
  
  const sanitized = domain.trim();
  return sanitized !== '' ? sanitized : null;
};