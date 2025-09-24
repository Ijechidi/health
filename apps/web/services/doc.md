/services
  /users
    ├── action.ts        # Contiendra les fonctions/actions liées aux utilisateurs (CRUD, login, etc.)
    ├── types.ts         # Types et interfaces spécifiques aux utilisateurs
    ├── user.ts          # Service principal (appel aux actions, logique métier)
    ├── validation.ts    # Schémas de validation (ex: Zod, Yup) pour inputs utilisateur
    └── utils.ts         # Fonctions utilitaires réutilisables (helpers)
