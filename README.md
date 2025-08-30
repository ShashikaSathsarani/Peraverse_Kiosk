# PeraVerse Digital Kiosk System

A modern, auto-cycling digital signage display for the PeraVerse event at the Faculty of Engineering, University of Peradeniya. Built with React and Vite, featuring a glassmorphism design and automatic page transitions.

## Features

- **Auto-Cycling Display**: Automatically cycles through three distinct pages every 10 seconds
- **Glassmorphism Design**: Modern UI with semi-transparent, blurred background effects
- **Responsive Layout**: Adapts to different kiosk screen sizes
- **Smooth Animations**: Subtle transitions and animations throughout the interface
- **Real-time Updates**: Live time display and dynamic content

## Pages

### 1. Home/Welcome Page
- Prominently displays "PeraVerse" branding
- Features Faculty of Engineering, University of Peradeniya information
- Image slideshow with university and event-related content
- Welcome message and feature highlights
- Real-time clock display

### 2. Event Schedule Page
- Clean, readable schedule of the day's events
- Each event shows session title, time, and venue
- Color-coded event types (ceremonies, workshops, exhibitions, etc.)
- Live status indicators (upcoming, live now, completed)
- Event type legend for easy understanding

### 3. Trending Page
- Trending exhibits with popularity rankings
- Real-time visitor counts and engagement metrics
- Live announcements and updates
- Event statistics and satisfaction metrics
- Interactive trending indicators

## Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **CSS3**: Custom glassmorphism styles with backdrop-filter
- **JavaScript ES6+**: Modern JavaScript features

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Production Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/           # React components
│   ├── HomePage.jsx     # Home/Welcome page component
│   ├── HomePage.css     # Home page styles
│   ├── SchedulePage.jsx # Event schedule component
│   ├── SchedulePage.css # Schedule page styles
│   ├── TrendingPage.jsx # Trending exhibits component
│   └── TrendingPage.css # Trending page styles
├── App.jsx              # Main application component
├── App.css              # Main application styles
├── index.css            # Global styles
└── main.jsx             # Application entry point
```

## Customization

### Adding New Events
Edit the `scheduleData` array in `SchedulePage.jsx` to add or modify events.

### Updating Trending Exhibits
Modify the `trendingExhibits` array in `TrendingPage.jsx` to update featured exhibits.

### Changing Auto-Cycle Timing
Adjust the interval in `App.jsx` (currently set to 10 seconds):
```javascript
const interval = setInterval(() => {
  setCurrentPage((prev) => (prev + 1) % pages.length)
}, 10000) // Change this value (in milliseconds)
```

### Styling Modifications
- Main color scheme: Modify CSS custom properties in `App.css`
- Glassmorphism effects: Adjust backdrop-filter values in component CSS files
- Typography: Update font imports in `index.css`

## Browser Compatibility

- Chrome/Chromium: Full support
- Firefox: Full support
- Safari: Full support (includes -webkit-backdrop-filter prefixes)
- Edge: Full support

## Accessibility Features

- High contrast mode support
- Reduced motion preferences respected
- Keyboard navigation support
- Screen reader compatible markup

## Deployment

This is a static React application that can be deployed to any web server or hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your web server
3. Ensure your server is configured to serve the `index.html` file for all routes

### Recommended Hosting Platforms
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static web hosting service

## License

This project is created for the Faculty of Engineering, University of Peradeniya.

## Support

For technical support or questions about the PeraVerse Digital Kiosk System, please contact the development team.

---

**PeraVerse 2025** - Faculty of Engineering, University of Peradeniya+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
