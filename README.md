# LevelUp Admin Frontend

Admin dashboard for the LevelUp e-learning platform built with React, Vite, and Tailwind CSS.

## Features

- **Secure Admin Authentication** - Login system with token-based authentication
- **User Management** - Manage students, instructors, and administrators
- **Course Management** - Review, approve, and monitor courses
- **Analytics Dashboard** - Real-time insights and performance metrics
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark Mode Support** - Toggle between light and dark themes
- **Real-time Notifications** - Stay updated with platform activities

## Tech Stack

- **React 19** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Frontend-admin
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Configure environment variables
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

5. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── api/           # API integration
├── components/    # Reusable components
├── context/       # React context providers
├── pages/         # Page components
├── utils/         # Utility functions
├── App.jsx        # Main app component
├── main.jsx       # App entry point
├── index.css      # Global styles
└── App.css        # Component styles
```

## Admin Features

### Dashboard Overview
- Platform statistics and metrics
- Recent activities and notifications
- System status monitoring
- Quick access to key functions

### User Management
- View all users (students, instructors, admins)
- Search and filter users
- Edit user profiles and roles
- Ban/unban users
- Delete user accounts

### Course Management
- Review pending course submissions
- Approve or reject courses
- Monitor course performance
- View course details and analytics

### Analytics
- User growth metrics
- Course performance analytics
- Revenue tracking
- Platform usage statistics
- Exportable reports

## API Integration

The admin frontend communicates with the backend through RESTful APIs:

- Authentication endpoints (`/admin/auth/*`)
- User management (`/admin/users/*`)
- Course management (`/admin/courses/*`)
- Analytics (`/admin/analytics/*`)

## Authentication

The application uses JWT tokens for authentication:
- Tokens are stored in localStorage (remember me) or sessionStorage
- Automatic token refresh on API calls
- Redirect to login on token expiration

## Responsive Design

The dashboard is fully responsive and adapts to different screen sizes:
- Desktop: Full sidebar and multi-column layouts
- Tablet: Collapsible sidebar
- Mobile: Overlay sidebar and single-column layouts

## Dark Mode

Users can toggle between light and dark themes. The preference is stored in the browser and persists across sessions.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.