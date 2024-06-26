import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  ReservationService,
  Reservation,
} from '../../services/reservation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div>
      <h2>Dashboard</h2>
      <button (click)="logout()">Logout</button>
      <button (click)="createReservation()">Create Reservation</button>
      @if(reservations$ | async; as reservations){
      <div>
        <h3>Upcoming Reservations</h3>
        <ul>
          @for(reservation of reservations; track $index){
          <li>
            {{ reservation.guestName }} ({{ reservation.unit }})
            <button (click)="deleteReservation(reservation.id!)">Del</button>
          </li>
          }
        </ul>
      </div>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private reservationService = inject(ReservationService);

  reservations$!: Observable<Reservation[]>;

  createReservation() {
    return this.reservationService.createReservation();
  }

  deleteReservation(id: string) {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          console.log('Reservation deleted successfully');
          // Refresh the list of reservations
          this.reservations$ = this.reservationService.getReservations();
        },
        error: (error) => {
          console.error('Error deleting reservation: ', error);
          // Handle error (e.g., show error message to user)
        },
      });
    }
  }
  ngOnInit() {
    this.reservations$ = this.reservationService.getReservations();
  }

  logout() {
    this.authService.logOut();
  }
}
