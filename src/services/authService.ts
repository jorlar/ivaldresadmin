import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../firebase';
import { adminConfig } from '../config/adminConfig';

export const authService = {
  // Login with custom credentials
  async loginWithCredentials(email: string, password: string) {
    console.log('AuthService: Attempting login with custom credentials...');
    try {
      console.log('AuthService: Attempting login with email:', email);
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      console.log('AuthService: Login successful for user:', userCredential.user.email);
      return userCredential.user;
    } catch (error: any) {
      console.error('AuthService: Detailed login error:', {
        code: error.code,
        message: error.message,
        email: email
      });
      
      // Provide more specific error messages
      switch (error.code) {
        case 'auth/invalid-email':
          throw new Error('Invalid email address');
        case 'auth/user-disabled':
          throw new Error('This account has been disabled');
        case 'auth/user-not-found':
          throw new Error('No account found with this email');
        case 'auth/wrong-password':
          throw new Error('Incorrect password');
        default:
          throw new Error(`Authentication failed: ${error.message}`);
      }
    }
  },

  // Login with admin credentials (kept for backward compatibility)
  async loginWithAdminCredentials() {
    console.log('AuthService: Attempting login with admin credentials...');
    try {
      if (!adminConfig.email || !adminConfig.password) {
        console.error('AuthService: Admin credentials missing:', {
          email: adminConfig.email ? '***' : 'missing',
          password: adminConfig.password ? '***' : 'missing'
        });
        throw new Error('Admin credentials not configured');
      }

      return this.loginWithCredentials(adminConfig.email, adminConfig.password);
    } catch (error: any) {
      console.error('AuthService: Admin login error:', error);
      throw error;
    }
  },

  // Logout
  async logout() {
    console.log('AuthService: Attempting logout...');
    try {
      await signOut(auth);
      console.log('AuthService: Logout successful');
    } catch (error) {
      console.error('AuthService: Error logging out:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser(): Promise<User | null> {
    console.log('AuthService: Getting current user...');
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('AuthService: Auth state changed, user:', user ? user.email : 'null');
        unsubscribe();
        resolve(user);
      });
    });
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    console.log('AuthService: Checking if user is authenticated...');
    const user = await this.getCurrentUser();
    const isAuth = !!user;
    console.log('AuthService: Authentication check result:', isAuth);
    return isAuth;
  }
}; 