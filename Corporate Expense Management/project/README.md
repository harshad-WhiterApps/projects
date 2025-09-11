# Corporate Expense Management App

A comprehensive expense management platform built with React, TypeScript, and Supabase.

## Features

- **Role-based Authentication**: Employee, Manager, Finance, and Admin roles
- **Expense Submission**: Upload receipts, categorize expenses, and track submissions
- **Approval Workflow**: Multi-level approval process with automated routing
- **Real-time Dashboard**: Expense tracking, analytics, and policy compliance
- **Reports & Analytics**: Comprehensive reporting with data visualization
- **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd corporate-expense-app
```

2. Install dependencies
```bash
npm install
```

3. Set up Supabase
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`
   - Run the migrations in the `supabase/migrations` folder

4. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

5. Start the development server
```bash
npm run dev
```

## Database Setup

The app uses Supabase with the following main tables:

- **profiles**: User information and roles
- **expenses**: Expense records with approval workflow
- **Storage bucket**: Receipt file storage

Run the migration files in order:
1. `create_profiles_table.sql`
2. `create_expenses_table.sql` 
3. `create_storage_bucket.sql`
4. `seed_demo_data.sql` (optional)

## Demo Credentials

For testing purposes, you can create these demo accounts:

- **Admin**: admin@company.com / password123
- **Manager**: manager@company.com / password123  
- **Employee**: employee@company.com / password123

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.tsx       # Authentication
│   ├── Layout.tsx      # App layout and navigation
│   ├── Dashboard.tsx   # Main dashboard
│   ├── ExpenseSubmission.tsx
│   ├── ApprovalWorkflow.tsx
│   └── Reports.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── App.tsx            # Main app component
└── main.tsx          # App entry point
```

## Key Features

### Authentication & Authorization
- Supabase Auth with email/password
- Role-based access control (RLS policies)
- Protected routes and components

### Expense Management
- Create, edit, and submit expenses
- Receipt upload with file storage
- Category-based organization
- Policy compliance checking

### Approval Workflow
- Manager/Finance approval process
- Bulk approval capabilities
- Status tracking and notifications
- Approval comments and history

### Reporting & Analytics
- Real-time expense dashboards
- Category and trend analysis
- Policy compliance reports
- Export capabilities

## Deployment

The app can be deployed to any static hosting service:

1. Build the project
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

Popular options:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.