import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Dashboard from './pages/Dashboard.jsx';
import Cabins from './pages/Cabins.jsx';
import Bookings from './pages/Bookings.jsx';
import Users from './pages/Users.jsx';
import Settings from './pages/Settings.jsx';
import Account from './pages/Account.jsx';
import Login from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import AppLayout from './ui/AppLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Booking from './pages/Booking';
import CheckIn from './pages/CheckIn';
import ProtectedRoute from './ui/ProtectedRoute';
import DarkModeContext from './context/DarkModeContext';

// Create a query client, a cache for storing query data in memory.
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
        },
    },
});

const App = () => {
    return (
        <DarkModeContext>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <GlobalStyle />
                <Toaster
                    position='top-center'
                    gutter={12}
                    containerStyle={{ margin: '8px' }}
                    toastOptions={{
                        success: {
                            duration: 5000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: '1.5rem',
                            maxWidth: '500px',
                            padding: '16px 24px',
                            background: 'var(--color-grey-0)',
                            color: 'var(--color-grey-800)',
                        },
                    }}
                    reverseOrder={false}
                />
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={<Navigate replace to='/dashboard' />}
                            />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/bookings' element={<Bookings />} />
                            <Route
                                path='/bookings/:bookingId'
                                element={<Booking />}
                            />
                            <Route
                                path='/checkin/:bookingId'
                                element={<CheckIn />}
                            />
                            <Route path='/cabins' element={<Cabins />} />
                            <Route path='/users' element={<Users />} />
                            <Route path='/settings' element={<Settings />} />
                            <Route path='/account' element={<Account />} />
                        </Route>

                        <Route path='/login' element={<Login />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </DarkModeContext>
    );
};

export default App;
