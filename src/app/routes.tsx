import { createHashRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { VoicePage } from './pages/VoicePage';
import { RoomPage } from './pages/RoomPage';
import { EmployeePage } from './pages/EmployeePage';
import { AppointmentPage } from './pages/AppointmentPage';
import { EventsPage } from './pages/EventsPage';
import { ClubsPage } from './pages/ClubsPage';
import { PaymentPage } from './pages/PaymentPage';
import { DirectionsPage } from './pages/DirectionsPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { AlumniPage } from './pages/AlumniPage';
import { AdministrationPage } from './pages/AdministrationPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createHashRouter([
  { path: '/', Component: HomePage },
  { path: '/chat', Component: ChatPage },
  { path: '/voice', Component: VoicePage },
  { path: '/room', Component: RoomPage },
  { path: '/employee', Component: EmployeePage },
  { path: '/administration', Component: AdministrationPage },
  { path: '/appointment', Component: AppointmentPage },
  { path: '/events', Component: EventsPage },
  { path: '/clubs', Component: ClubsPage },
  { path: '/programs', Component: ProgramsPage },
  { path: '/alumni', Component: AlumniPage },
  { path: '/payments', Component: PaymentPage },
  { path: '/directions', Component: DirectionsPage },
  { path: '*', Component: NotFoundPage },
]);
