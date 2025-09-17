
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmailAndPassword: (email: string, password: string) => Promise<void>;
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

  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: "Account created successfully!", description: "Please log in with your new credentials." });
      router.push('/login');
    } catch (error: any) {
      console.error("Error signing up: ", error);
      toast({ title: "Failed to create account.", description: error.message, variant: "destructive" });
    }
  }

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Successfully signed in!" });
      router.push('/');
    } catch (error: any) {
      console.error("Error signing in: ", error);
      toast({ title: "Failed to sign in.", description: error.message, variant: "destructive" });
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
