import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LucideChevronRight, LucideLock, LucideUser } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    LucideUser,
    LucideLock,
    ButtonModule,
    LucideChevronRight,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
