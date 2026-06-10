# Setup instructions

## API/Backend
1. `cd` to the `backend/` directory
2. Run `npm install`
3. Run `npm run dev` to seed the db and run the API

## Client/Frontend
1. `cd` to the `frontend/` directory
2. Run `npm install`
3. Run `npm run dev`

## Testing
Using `Vitest` to test API request validation
1. `cd` to the `backend/` directory
2. Run `npm run test`

### Testing approach
Vitest is used to test against the Zod schemas which are used to validate requests to the endpoints under `/api/orders`.

The `createOrderSchema` tests cover the POST body: they confirm a fully valid order is accepted, that each required field (`orderId`, `customerId`, `item`, `quantity`) is rejected when missing, and that `quantity` must be a positive integer (rejecting zero, negatives, decimals, and non-numeric strings since request bodies are not coerced).

The `getOrdersQuerySchema` tests cover the GET query params: they verify that all params are optional, that `page` and `pageSize` are coerced from strings to numbers, that an invalid `page` is rejected, and that `sortBy` is restricted to a whitelist of columns with only valid `sortDir` values accepted.

## Packages/external dependencies used
### API
- `better-sqlite3`
- `drizzle-orm`
- `express`
- `zod`

### Client
- `tailwind`
- `TanStack Query`