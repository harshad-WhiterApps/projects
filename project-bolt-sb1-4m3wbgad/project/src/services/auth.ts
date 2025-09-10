import { User, AuthState } from '../types/user';

class AuthService {
  private static instance: AuthService;
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false
  };
  private listeners: ((state: AuthState) => void)[] = [];

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.authState.loading = true;
    this.notify();

    try {
      // Simulate API call - in production, this would call your secure backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data based on email
      const mockUsers: Record<string, User> = {
        'admin@healthcorp.com': {
          id: '1',
          email: 'admin@healthcorp.com',
          firstName: 'Sarah',
          lastName: 'Wilson',
          role: 'admin',
          isActive: true,
          createdAt: new Date(),
          lastLogin: new Date()
        },
        'dr.smith@healthcorp.com': {
          id: '2',
          email: 'dr.smith@healthcorp.com',
          firstName: 'Dr. Michael',
          lastName: 'Smith',
          role: 'doctor',
          licenseNumber: 'MD123456',
          specialization: 'Internal Medicine',
          department: 'Internal Medicine',
          isActive: true,
          createdAt: new Date(),
          lastLogin: new Date()
        },
        'nurse.jones@healthcorp.com': {
          id: '3',
          email: 'nurse.jones@healthcorp.com',
          firstName: 'Jennifer',
          lastName: 'Jones',
          role: 'nurse',
          licenseNumber: 'RN789012',
          department: 'Emergency',
          isActive: true,
          createdAt: new Date(),
          lastLogin: new Date()
        },
        'patient@example.com': {
          id: '4',
          email: 'patient@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'patient',
          isActive: true,
          createdAt: new Date(),
          lastLogin: new Date()
        }
      };

      const user = mockUsers[email];
      
      if (user && password === 'demo123') {
        this.authState = {
          user,
          isAuthenticated: true,
          loading: false
        };
        localStorage.setItem('emr_user', JSON.stringify(user));
        this.notify();
        return { success: true };
      } else {
        this.authState.loading = false;
        this.notify();
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      this.authState.loading = false;
      this.notify();
      return { success: false, error: 'Login failed' };
    }
  }

  logout() {
    this.authState = {
      user: null,
      isAuthenticated: false,
      loading: false
    };
    localStorage.removeItem('emr_user');
    this.notify();
  }

  initializeAuth() {
    const savedUser = localStorage.getItem('emr_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.authState = {
          user,
          isAuthenticated: true,
          loading: false
        };
      } catch (error) {
        localStorage.removeItem('emr_user');
      }
    }
    this.notify();
  }

  getAuthState(): AuthState {
    return this.authState;
  }

  hasPermission(action: string, resource: string): boolean {
    if (!this.authState.user) return false;

    const { role } = this.authState.user;
    
    const permissions: Record<string, string[]> = {
      admin: ['*'],
      doctor: ['patient:read', 'patient:write', 'appointment:read', 'appointment:write', 'message:read', 'message:write'],
      nurse: ['patient:read', 'patient:write', 'appointment:read', 'message:read', 'message:write'],
      receptionist: ['patient:read', 'appointment:read', 'appointment:write', 'message:read'],
      patient: ['patient:read-own', 'appointment:read-own', 'message:read', 'message:write']
    };

    const userPermissions = permissions[role] || [];
    const requiredPermission = `${resource}:${action}`;
    
    return userPermissions.includes('*') || userPermissions.includes(requiredPermission);
  }
}

export default AuthService.getInstance();