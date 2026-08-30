import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SmokeyBackground } from '@/shared/components/ui/smokey-background/smokey-background';
import {
  LucideBrain,
  LucideChevronsUp,
  LucideBookCheck,
  LucideMessageSquareMore,
} from '@lucide/angular';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
    SmokeyBackground,
    LucideChevronsUp,
    LucideBrain,
    LucideBookCheck,
    LucideMessageSquareMore,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
