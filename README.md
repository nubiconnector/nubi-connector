# NUBI

# NubiAnalytics - analytics for blockchains as Ethereum and Near.

### Tools

-   React.js
-   Redux
-   Web3.js
-   Mongo.db
-   Express
-   Docker

### ! Rules

REPO_RULES_README.md

### ! How to run back-end (temporary solution till database will be up on production server)

-   Start Mongo.db with docker-compose (`docker-compose up -d`)
-   Configue your mongo user in order to log in to `nubi_db` (see ./scripts/\*\*)
-   Run express server locally (`start:server:dev`)
-   Create `.env.local` file and add your `DATABASE_USERNAME` and `DATABASE_PASSWORD` variables to.
-   If any problems ask `maryjanyes` :D
