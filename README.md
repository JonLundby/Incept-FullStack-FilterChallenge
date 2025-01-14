This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



------------------------------------------------------------------------------------------------------------------------------------------------------------

## Code Challenge: Analytics Filter System

### Background
Incept Sustainability is an E-learning platform that emphasizes feedback from employees who are the main users within the learning platform. Companies can sign up and get access to a number of seats they have agreed with the Incept Team.

### Task Overview
Create an analytics filter page that allows users to filter completed modules based on units and employee locations. The system should provide interactive, multi-select filters that dynamically update based on user selections.

### Technical Requirements

#### Frontend (Next.js)
1. Create a page with three multi-select filters:
   - Modules filter
   - Units filter
   - Locations filter
2. Add two buttons:
   - Apply Filters
   - Reset Filters
3. Implement bidirectional filter dependencies:
   - Selected modules affect available units
   - Selected units affect available locations
   - Selected locations affect available modules
   - etc.

#### Backend (Express)
1. Set up an Express server
2. Use Drizzle as the ORM to connect with the provided SQLite database
3. Create necessary endpoints:
   - GET endpoint to fetch initial filter options
   - POST endpoint to validate and process applied filters

### Getting Started
1. The SQLite database is provided in the `sqlite` folder
2. Use Drizzle to create your schema and connect to the database
3. Implement the necessary API endpoints
4. Create the frontend filter interface

### Success Criteria
- Filters should update dynamically based on other selections
- All filters should support multiple selections
- The apply button should send selected filters to the backend for validation
- The reset button should clear all selections
- The implementation should handle edge cases and provide appropriate error handling

### What Not to Implement
- Authentication/Authorization
- Company management
- Module content or completion logic
- Analytics visualization

### Technical Stack
- Frontend: Next.js
- Backend: Express.js
- Database: SQLite
- ORM: Drizzle

### Evaluation Criteria
- Code organization and clarity
- Proper implementation of bidirectional filter dependencies
- Error handling
- API design
- TypeScript usage
- Performance considerations