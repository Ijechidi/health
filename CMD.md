


# Installer toutes les dépendances au niveau du workspace
pnpm install -w

# Ajouter un package (ex. axios) dans l'app web uniquement
pnpm add axios --filter web

# Ajouter prisma uniquement dans le package database
pnpm add prisma --filter database

# Ajouter un package interne (ex: @repo/ui) dans web
pnpm add @repo/ui --filter web

# Ajouter un package comme devDependency
pnpm add -D typescript --filter api


# Lancer l'app web (Next.js)
pnpm --filter web dev

# Lancer l'API (NestJS)
pnpm --filter api start:dev

# Builder un seul package
pnpm --filter ui build

# Builder tous les apps en parallèle (turbo va optimiser)
pnpm build -w


# Générer le client Prisma
pnpm -w exec prisma generate --schema=packages/database/prisma/schema.prisma
pnpm -w exec prisma db push --schema=packages/database/prisma/schema.prisma
pnpm --filter database db:push

# Lancer les migrations
pnpm -w exec prisma migrate dev --schema=packages/database/prisma/schema.prisma

# Vérifier le schéma
pnpm -w exec prisma validate --schema=packages/database/prisma/schema.prisma


# Lister les dépendances de web
pnpm list --filter web

# Vérifier si web dépend de @repo/ui
pnpm list @repo/ui --filter web

# Voir tous les liens internes du workspace
pnpm why @repo/database


# Lancer les tests uniquement sur web
pnpm --filter web test

# Lancer les tests sur tous les packages en parallèle
pnpm test -w













##pnpm --filter


pnpm --filter web dev ##pnpm run dev

pnpm -w i /build / dev ( execute au niveaux du worksapace)

#packages/batabase

 pnpm -w exec prisma generate -- --schema=packages/database/prisma/schema.prisma


## ajoute un package dans un autre 
 pnpm add @repo/services --filter web 



 ## verifi si un package est lier a un autre 
 pnpm list @repo/services --filter web

## lancer un package
 pnpm --filter web dev