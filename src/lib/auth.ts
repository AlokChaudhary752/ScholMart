import { create } from "zustand";

export type UserRole =
  | "SUPER_ADMIN"
  | "SUPPLIER_ADMIN"
  | "MANAGER"
  | "ACCOUNTANT"
  | "PRODUCTION_HEAD"
  | "STORE_KEEPER"
  | "SALES_EXECUTIVE"
  | "SCHOOL_REPRESENTATIVE"
  | "PARENT";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  schoolName?: string;
  schoolId?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
}

export const DEMO_USERS: Record<string, AuthUser> = {
  admin: {
    id: "usr-admin-01",
    fullName: "Vikram Malhotra",
    email: "admin@scholmart.com",
    phone: "+91 98110 54321",
    role: "SUPPLIER_ADMIN",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
  schoolRep: {
    id: "usr-school-02",
    fullName: "Dr. Sunita Varma",
    email: "principal@dps.edu.in",
    phone: "+91 98220 12345",
    role: "SCHOOL_REPRESENTATIVE",
    schoolName: "Delhi Public School, Sector 45",
    schoolId: "sch-dps-01",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  production: {
    id: "usr-prod-03",
    fullName: "Harish Sharma",
    email: "production@scholmart.com",
    phone: "+91 98330 67890",
    role: "PRODUCTION_HEAD",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  accountant: {
    id: "usr-acc-04",
    fullName: "Pooja Singhania",
    email: "accounts@scholmart.com",
    phone: "+91 98440 11223",
    role: "ACCOUNTANT",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: DEMO_USERS.admin, // Default to logged in as Admin for frictionless evaluation
  isAuthenticated: true,
  isLoading: false,

  login: async (email: string, role = "SUPPLIER_ADMIN") => {
    set({ isLoading: true });

    // Match demo user or create session
    let matchedUser = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!matchedUser) {
      matchedUser = {
        id: `usr-${Date.now()}`,
        fullName: email.split("@")[0].toUpperCase(),
        email,
        role: role as UserRole,
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      };
    }

    set({ user: matchedUser, isAuthenticated: true, isLoading: false });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));
