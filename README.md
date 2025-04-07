# ozee.me | Personal Portfolio

![Portfolio Preview](https://ozee.me)

A creative portfolio website showcasing my journey through code, music, and games. This responsive, interactive website features modern design principles and engaging user experiences.

## 📋 Table of Contents
- [Overview](#overview)
- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Live Demo](#-live-demo)
- [💻 Installation](#-installation)
- [🔧 Development](#-development)
- [📁 Project Structure](#-project-structure)
- [📱 Responsive Design](#-responsive-design)
- [🎨 Customization](#-customization)
- [👥 Contributing](#-contributing)

## Overview

This portfolio website serves as a personal showcase of my work as an IT student combining creativity with technical skills. The site includes sections for my professional background, projects, music interests, and contact information.

## ✨ Features

- **Responsive Design**: Fully adaptive layout for mobile, tablet, and desktop views
- **Dark/Light Theme Toggle**: User preference-based theme switching with local storage persistence
- **Interactive Animations**: 
  - AOS (Animate On Scroll) library integration
  - Custom animation effects on project cards and text elements
  - Parallax scrolling in the work section
- **Modern UI Elements**:
  - Glassmorphism effects on UI components
  - Animated skill bars with progress indication
  - Project cards with hover animations and tilt effects
- **Performance Optimized**:
  - Conditional loading for mobile devices
  - Reduced motion settings for accessibility
  - Optimized background effects
- **Interactive Elements**:
  - Contact form with validation
  - Social media links with animations
  - Smooth scrolling navigation
  - Scroll progress indicator

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Tailwind CSS
- **Animations**: 
  - AOS (Animate On Scroll)
  - Custom animation libraries
- **UI Effects**:
  - Particles.js for background effects
  - Tilt.js for 3D card interactions
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter, Roboto)
- **Build Tools**: NPM, Webpack (optional)

## 🚀 Live Demo

Visit the live portfolio at: [ozee.me](https://ozee.me)

## 💻 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ozee.me.git
   ```
2. Navigate to the project directory:
   ```sh
   cd ozee.me
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## 🔧 Development

To run the project locally:

1. Start a development server:
   ```sh
   npm run dev
   ```
   
2. For production build:
   ```sh
   npm run build
   ```

## 📁 Project Structure

```
ozee.me/
├── index.html                # Main entry point
├── main.css                  # Core styles
├── js/
│   ├── main.js               # Main JavaScript entry point
│   ├── AOS.js                # Animation configurations
│   ├── background.js         # Background effects
│   ├── contact.js            # Contact form handling
│   ├── cursor-effect.js      # Custom cursor effects
│   ├── glass.js              # Glassmorphism effects
│   ├── hamburger.js          # Mobile menu toggle
│   ├── parallax.js           # Parallax scrolling effects
│   ├── reveal.js             # Element reveal animations
│   ├── scroll-progress.js    # Scroll progress indicator
│   ├── skills.js             # Skills visualization
│   ├── theme_switch.js       # Theme toggle functionality
│   ├── tilt.js               # 3D card tilt effects
│   └── typography.js         # Typography enhancements
├── images/                   # Image assets
├── games/                    # Interactive games
└── README.md                 # Project documentation
```

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-first approach
- Custom breakpoints for various device sizes
- Tailored experiences for different devices
- Performance optimizations for mobile

## 🎨 Customization

1. **Theme Colors**: Edit theme variables in `main.css`
2. **Content**: Update project details and personal information in `index.html`
3. **Skills**: Modify the skills array in `skills.js`
4. **Projects**: Add new project cards in the projects section

## 👥 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/ozee.me/issues) if you want to contribute.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Created with ❤️ by [Oskar Bednarek]
