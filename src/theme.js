// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6366F1', // Indigo
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#F59E0B', // Amber
            contrastText: '#ffffff',
        },
        success: {
            main: '#10B981', // Emerald
            contrastText: '#ffffff',
        },
        error: {
            main: '#EF4444', // Red
            contrastText: '#ffffff',
        },
        warning: {
            main: '#F97316', // Orange
            contrastText: '#ffffff',
        },
        info: {
            main: '#3B82F6', // Blue
            contrastText: '#ffffff',
        },
        background: {
            default: '#F9FAFB',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#111827',
            secondary: '#6B7280',
        },
    },

    typography: {
        fontFamily: 'Inter, sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 700 },
        h2: { fontSize: '2rem', fontWeight: 700 },
        h3: { fontSize: '1.75rem', fontWeight: 600 },
        h4: { fontSize: '1.5rem', fontWeight: 600 },
        h5: { fontSize: '1.25rem', fontWeight: 500 },
        h6: { fontSize: '1.125rem', fontWeight: 500 },
        body1: { fontSize: '1rem', lineHeight: 1.6 },
        body2: { fontSize: '0.875rem', lineHeight: 1.5 },
        button: { textTransform: 'none', fontWeight: 500 },
    },

    shape: {
        borderRadius: 8,
    },

    spacing: 8, // 1 spacing unit = 8px

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },

    shadows: [
        'none',
        '0px 1px 3px rgba(0,0,0,0.12)',
        '0px 1px 5px rgba(0,0,0,0.2)',
        '0px 3px 5px rgba(0,0,0,0.12)',
        '0px 5px 10px rgba(0,0,0,0.1)',
        ...Array(20).fill('0px 4px 20px rgba(0,0,0,0.05)'),
    ],

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontWeight: 600,
                    boxShadow: 'none',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 2px 6px rgba(0,0,0,0.08)',
                    },
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.04)',
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#fff',
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },

        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '0.75rem',
                    borderRadius: 4,
                },
            },
        },

        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});

export default theme;
