export class OrganizationError extends Error {
    constructor(
      message: string,
      public code: string,
      public status: number = 400
    ) {
      super(message);
      this.name = 'OrganizationError';
    }
  }
  
  export class UnauthorizedError extends OrganizationError {
    constructor(message: string = 'Non authentifié') {
      super(message, 'UNAUTHORIZED', 401);
    }
  }
  
  export class ForbiddenError extends OrganizationError {
    constructor(message: string = 'Accès non autorisé') {
      super(message, 'FORBIDDEN', 403);
    }
  }
  
  export class ValidationError extends OrganizationError {
    constructor(message: string = 'Données invalides') {
      super(message, 'VALIDATION_ERROR', 400);
    }
  }
  
  export class DomainExistsError extends OrganizationError {
    constructor() {
      super(
        'Ce domaine est déjà utilisé par une autre organisation',
        'DOMAIN_ALREADY_EXISTS',
        409
      );
    }
  }
  
  export class NameExistsError extends OrganizationError {
    constructor() {
      super(
        'Ce nom d\'organisation est déjà utilisé',
        'NAME_ALREADY_EXISTS',
        409
      );
    }
  }