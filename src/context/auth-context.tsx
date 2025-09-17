
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmailAndPassword: (email: string, password: string, fullName: string) => Promise<void>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({ title: "Successfully signed in with Google!" });
      router.push('/');
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast({ title: "Failed to sign in with Google.", variant: "destructive" });
    }
  };

  const signUpWithEmailAndPassword = async (email: string, password: string, fullName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      // Manually set user state to trigger UI update
      setUser({ ...userCredential.user, displayName: fullName });
      toast({ title: "Account created successfully!", description: "You are now logged in." });
      router.push('/');
    } catch (error: any) {
      console.error("Error signing up: ", error);
      const errorMessage = error.code === 'auth/email-already-in-use'
        ? 'This email address is already in use.'
        : error.message;
      toast({ title: "Failed to create account.", description: errorMessage, variant: "destructive" });
    }
  }

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Successfully signed in!" });
      router.push('/');
    } catch (error: any) {
      console.error("Error signing in: ", error);
       const errorMessage = (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password')
        ? 'Invalid email or password. Please try again.'
        : error.message;
      toast({ title: "Failed to sign in.", description: errorMessage, variant: "destructive" });
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({ title: "Successfully signed out." });
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({ title: "Failed to sign out.", variant: "destructive" });
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signUpWithEmailAndPassword, signInWithEmailAndPassword, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
