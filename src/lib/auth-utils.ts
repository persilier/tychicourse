import { useLocale } from 'next-intl';

export async function logout() {
  try {
    // Call the logout API endpoint
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    // Get current locale from the URL
    const locale = window.location.pathname.split('/')[1];
    
    // Redirect to login page with locale prefix
    window.location.href = `/${locale}/login`;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}
