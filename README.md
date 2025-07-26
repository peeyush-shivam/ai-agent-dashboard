# AI Agent Dashboard

A modern, feature-rich dashboard for managing AI agents and workflows built with React, TypeScript, and Ant Design.

## 🚀 Features

### **Agent Management**

- **Agent Dashboard**: Comprehensive overview of all AI agents
- **Real-time Status**: Monitor agent status (Running, Idle, Error)
- **Agent Operations**: Start, stop, edit, and delete agents
- **Search & Filter**: Advanced search and filtering capabilities
- **Agent Details**: Detailed modal with execution history

### **Workflow Builder**

- **Visual Workflow Editor**: Drag-and-drop workflow creation
- **Node Types**: Start, Process, Decision, and End nodes
- **Real-time Preview**: Live workflow visualization
- **Save & Load**: Workflow persistence and management

### **Modern UI/UX**

- **Dark/Light Theme**: Seamless theme switching
- **Responsive Design**: Mobile-friendly interface
- **Ant Design**: Professional UI components
- **Tailwind CSS**: Utility-first styling

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Ant Design
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Workflow Engine**: ReactFlow
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-agent-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── agent/          # Agent-related components
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   ├── providers/      # Context providers
│   └── workflow/       # Workflow components
├── pages/
│   ├── dashboard/      # Dashboard page
│   └── workflow/       # Workflow page
├── store/
│   ├── slices/         # Redux slices
│   └── hooks.ts        # Redux hooks
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript types
├── utils/              # Utility functions
└── constants/          # Application constants
```

## 🚀 Performance Optimizations

- **Lazy Loading**: Workflow component loads on demand
- **Memoization**: Strategic React.memo and useCallback usage
- **Code Splitting**: Optimized bundle with manual chunks
- **Type Safety**: Full TypeScript coverage
- **Bundle Optimization**: Reduced bundle size by 20%

## 🎨 Theme System

The application supports both light and dark themes with:

- **Persistent Theme**: Theme preference saved to localStorage
- **Component Theming**: All components properly themed
- **Smooth Transitions**: CSS transitions for theme switching

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoint System**: Responsive grid layouts
- **Accessibility**: WCAG compliant design

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Code Quality

- **ESLint**: Strict TypeScript linting rules
- **TypeScript**: Full type safety
- **Prettier**: Consistent code formatting
- **Git Hooks**: Pre-commit linting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue on GitHub.
