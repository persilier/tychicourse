import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, DEMO_USER } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Check if credentials match demo user
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      // Create a JWT token
      const token = jwt.sign(
        {
          id: DEMO_USER.id,
          email: DEMO_USER.email,
          name: DEMO_USER.name,
          role: DEMO_USER.role
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Return the token and user info (except password)
      const { password: _, ...userWithoutPassword } = DEMO_USER;
      return NextResponse.json(
        { 
          token,
          user: userWithoutPassword
        },
        { status: 200 }
      );
    }

    // If credentials don't match
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
