# Auth Kit React

[![npm version](https://badge.fury.io/js/auth-kit-react.svg)](https://badge.fury.io/js/auth-kit-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Auth Kit React is a versatile authentication and authorization package for React applications. It provides a simple and configurable solution for managing user authentication, authorization, and session handling.

## Features

- **User Authentication:** Easily integrate user authentication into your React applications.
- **Authorization:** Manage user roles and permissions for secure access control.
- **Session Handling:** Handle user sessions and persist authentication state.
- **Configurability:** Configure the package based on your application's specific needs.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
<!-- - [Examples](#examples)
- [Contributing](#contributing) -->
- [License](#license)

## Installation

```bash
npm install auth-kit-react
or
yarn add auth-kit-react

```

## Usage

1. Import AuthProvider and useAuth in your main application file.

```typescript
// src/App.js

import React from 'react';
import { AuthProvider, useAuth, ProtectedRoute } from 'auth-kit-react';

function App() {
  return (
    <AuthProvider authUtilsOptions={{ baseUrl: 'your-api-url' }}>
      {/* Your application components */}
    </AuthProvider>
  );
}

export default App;
```

2. Use the useAuth hook in your components.

```typescript
// src/components/Profile.js

import React from 'react';
import { useAuth } from 'auth-kit-react';

function Profile() {
  const { token, login, logout } = useAuth();

  return (
    <div>
      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login('username', 'password')}>Login</button>
      )}
    </div>
  );
}

export default Profile;
```

3. Protect your routes using ProtectedRoute component.

```typescript
// src/components/Dashboard.js

import React from 'react';

function Dashboard() {
  return <div>Protected Dashboard</div>;
}

export default Dashboard;

```

4. Add protected routes in your main application.

```typescript
// src/App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { ProtectedRoute, AuthProvider } from 'auth-kit-react';

function App() {
  return (
    <AuthProvider authUtilsOptions={authUtilsOptions}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
  );
}

export default App;

```

## API Documentation

## AuthProvider

**Props:**

- `authUtilsOptions` (required): An object containing authentication utility options like baseUrl.

## useAuth Hook

**Returns:**

An object with the following properties:

- `token`: The current authentication token.
- `login`: A function to perform login.
- `logout`: A function to perform logout.
- `useAuthenticatedApi`: A function to use the authenticated API.

## ProtectedRoute Component

**Props:**

- `path` (required): The route path.
- `element` (required): The component to render for the protected route.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
