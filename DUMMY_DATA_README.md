# LevelUp Admin Frontend - Simplified Dashboard

This admin frontend now uses dummy data and focuses on core analytics and dashboard functionality.

## Features

- **Authentication**: Use `admin` / `admin123` to login
- **Dashboard Overview**: Real-time statistics and recent activities
- **Analytics**: User growth, course analytics, and revenue data
- **Settings**: System configuration (placeholder)

## Dummy Data

All data is stored in `src/data/dummyData.js` and includes:

- Admin profile and authentication
- Dashboard statistics and metrics
- System activity logs
- Analytics data for charts and graphs

## Removed Features

- User Management (removed to simplify the dashboard)
- Course Management (removed to simplify the dashboard)

## Key Changes

- Removed all API files from `src/api/` directory
- Removed UserManagement and CourseManagement components
- Updated sidebar to show only Dashboard, Analytics, and Settings
- Simplified dummy data to focus on system analytics
- Added simulated API delays for realistic UX
- Maintained core dashboard functionality with local state management

## Development

To run the application:

```bash
npm install
npm run dev
```

**Note**: Requires Node.js version 20.19+ or 22.12+

## Demo Credentials

- **Username**: admin
- **Password**: admin123

The admin dashboard now focuses on system monitoring and analytics rather than user/course management.