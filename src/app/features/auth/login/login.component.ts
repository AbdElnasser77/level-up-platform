import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { IconFieldModule } from 'primeng/iconfield';
import { PasswordModule } from 'primeng/password';
import { LucideLock, LucideUser } from '@lucide/angular';

@Component({
  selector: 'app-login',
  imports: [
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    IconFieldModule,
    LucideUser,
    LucideLock,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
