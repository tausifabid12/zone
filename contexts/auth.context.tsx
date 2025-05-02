import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import auth from '@react-native-firebase/auth';

interface AuthContextProps {
    user: any;
    loading: boolean;
    signInWithPhoneNumber: (phoneNumber: string) => Promise<void>;
    confirmCode: (code: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [FUser, setFUser] = useState()
    const [loading, setLoading] = useState<boolean>(true);
    const [confirm, setConfirm] = useState<any>(null);



    async function getUserData() {
        const userData = await AsyncStorage.getItem('userData')
        const us = JSON.parse(userData)
        setUser(us)

    }

    useEffect(() => {
        getUserData()
        // const subscriber = auth().onAuthStateChanged((user) => {
        //     setUser(user);
        //     setLoading(false);
        // });
        // return subscriber; // unsubscribe on unmount
    }, []);

    const signInWithPhoneNumber = async (phoneNumber: string) => {
        // try {
        //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        //     setConfirm(confirmation);
        // } catch (error) {
        //     console.error('Phone sign-in failed', error);
        //     throw error;
        // }
    };

    const confirmCode = async (code: string) => {
        // try {
        //     if (confirm) {
        //         await confirm.confirm(code);
        //     } else {
        //         throw new Error('No confirmation available');
        //     }
        // } catch (error) {
        //     console.error('Invalid code', error);
        //     throw error;
        // }
    };

    const logout = async () => {
        // try {
        //     await auth().signOut();
        //     setUser(null);
        // } catch (error) {
        //     console.error('Logout failed', error);
        //     throw error;
        // }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithPhoneNumber, confirmCode, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export default AuthProvider