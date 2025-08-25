
## 📂 Project Structure

```
turbo-nest-prisma/
├── apps/
│   ├── api/         # NestJS backend application
│   └── web/         # Next.js frontend application
├── packages/
│   ├── database/    # Prisma schema and client
│   ├── eslint-config/ # Shared ESLint config
│   ├── typescript-config/ # Shared TypeScript config
│   └── ui/          # Shared React components (Shadcn/ui)
├── pnpm-workspace.yaml
├── package.json
└── turbo.json       # Turborepo configuration
```

---

## 🚀 Getting Started

Follow these steps to get your development environment set up.

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (Version specified in root `package.json` -> `engines.node`, e.g., >=18)
- [pnpm](https://pnpm.io/) (Version specified in root `package.json` -> `packageManager`, e.g., pnpm@9.0.0)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (Recommended for running a local database instance)

### 2. Clone the Repository

```bash
git clone url
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Set Up Environment Variables

Environment variables are crucial for configuring database connections, API endpoints, etc.

- **Database:**

  - Create a `.env` file in `packages/database`.
  - Add your `DATABASE_URL`. Example for PostgreSQL:
    ```env
    # packages/database/.env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    ```
    _(If using the provided Docker setup, adjust accordingly, e.g., `postgresql://postgres:postgres@localhost:5432/mydb?schema=public`)_

- **Backend (`apps/api`):**

  - Create a `.env` file in `apps/api`.
  - Define the `PORT` for the NestJS server (defaults to 3001 if not set).
  - You might need to add the `DATABASE_URL` here as well.
    ```env
    # apps/api/.env
    PORT=3001
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    ```

- **Frontend (`apps/web`):**

  - Create a `.env` file in `apps/web`.
  - Define the URL for your backend API:
    ```env
    # apps/web/.env.local
    NEXT_PUBLIC_API_URL=http://localhost:3001 # Adjust port if changed in apps/api/.env
    ```

**\*Note:** Remember to add `.env*` files to your `.gitignore` to avoid committing sensitive credentials.\*

### 5. Set Up the Database

- **Using Docker (Recommended):**

  - If you don't have a `docker-compose.yml` file, create one in the root directory:

    ```yaml
    # docker-compose.yml
    version: "3.8"
    services:
      db:
        image: postgres:15
        restart: always
        environment:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: mydb
        ports:
          - "5432:5432"
        volumes:
          - postgres_data:/var/lib/postgresql/data

    volumes:
      postgres_data:
    ```

  - Start the database container:
    ```bash
    docker compose up -d
    ```

- **Manual Setup:** Ensure your database server (PostgreSQL, MySQL, etc.) is running and accessible with the credentials specified in your `DATABASE_URL`.

### 6. Run Database Migrations

Generate the Prisma Client based on your schema.

```bash
pnpm turbo db:generate
```

Apply the Prisma schema to your database:

```bash
# This command reads schema.prisma and applies changes to the database
pnpm turbo db:migrate
```

---

## 💻 Development

Run the development servers for all applications simultaneously:

```bash
pnpm turbo dev
```

- **Frontend (`apps/web`):** Accessible at [http://localhost:3000](http://localhost:3000) (or the next available port).
- **Backend (`apps/api`):** Accessible at [http://localhost:3001](http://localhost:3001) (or the port specified in `apps/api/.env`).

Turborepo will manage the processes and cache results efficiently.

## ✨ Linting and Formatting

- **Lint:** Check code for style and potential errors using ESLint.
  ```bash
  pnpm turbo lint
  ```
- **Format:** Automatically format code using Prettier.
  ```bash
  pnpm format
  ```

---

## 🧪 Type Checking

Check for TypeScript errors across the entire monorepo:

```bash
pnpm turbo check-types
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.
