import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from '@angular/fire/firestore';
import {
  Auth,
  User,
  user,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface Reservation {
  id?: string;
  unit: string;
  arrivalDate: Date;
  departureDate: Date;
  guestName: string;
  email: string;
  phone: string;
  confirmationNumber: string;
  airbnb: boolean;
  userId: string; // Add this to associate reservations with users
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  private collectionPath = 'reservations';
  user$: Observable<User | null> = user(this.auth);

  newReservation: Omit<Reservation, 'id' | 'userId'> = {
    unit: '2354',
    arrivalDate: new Date(),
    departureDate: new Date(),
    guestName: 'Tim Blahtwo',
    email: 'blahtwotim@gmail.com',
    phone: '2565522555',
    confirmationNumber: '654321',
    airbnb: false,
  };

  // Authentication methods
  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signIn(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signOut() {
    return from(signOut(this.auth));
  }

  createReservation() {
    this.addReservation(this.newReservation).subscribe({
      next: (docRef) => {
        console.log('Reservation created with ID: ', docRef.id);
        // Reset form or navigate to another page
      },
      error: (error) => {
        console.error('Error creating reservation: ', error);
        // Handle error (e.g., show error message to user)
      },
    });
  }

  // Reservation methods
  addReservation(reservation: Omit<Reservation, 'userId'>) {
    return this.user$.pipe(
      switchMap((user) => {
        if (!user) return throwError(() => new Error('User not authenticated'));
        const reservationWithUserId = { ...reservation, userId: user.uid };
        const reservationsRef = collection(this.firestore, this.collectionPath);
        return from(addDoc(reservationsRef, reservationWithUserId));
      })
    );
  }

  getReservations(): Observable<Reservation[]> {
    return this.user$.pipe(
      switchMap((user) => {
        if (!user) return throwError(() => new Error('User not authenticated'));
        const reservationsRef = collection(this.firestore, this.collectionPath);
        const userReservationsQuery = query(
          reservationsRef,
          // where('userId', '==', user.uid)
          where('userId', '==', user.uid)
        );
        return collectionData(userReservationsQuery, {
          idField: 'id',
        }) as Observable<Reservation[]>;
      })
    );
  }

  updateReservation(id: string, reservation: Partial<Reservation>) {
    return this.user$.pipe(
      switchMap((user) => {
        if (!user) return throwError(() => new Error('User not authenticated'));
        const reservationDocRef = doc(
          this.firestore,
          `${this.collectionPath}/${id}`
        );
        return from(updateDoc(reservationDocRef, reservation));
      })
    );
  }

  deleteReservation(id: string) {
    return this.user$.pipe(
      switchMap((user) => {
        if (!user) return throwError(() => new Error('User not authenticated'));
        const reservationDocRef = doc(
          this.firestore,
          `${this.collectionPath}/${id}`
        );
        return from(deleteDoc(reservationDocRef));
      })
    );
  }

  // Helper method to get current user
  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }
}
