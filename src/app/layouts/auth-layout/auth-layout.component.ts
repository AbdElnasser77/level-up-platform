import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SmokeyBackground } from '@/shared/components/ui/smokey-background/smokey-background';
import {
  LucideBrain,
  LucideChevronsUp,
  LucideBookCheck,
  LucideMessageSquareMore,
  LucideDynamicIcon,
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
    LucideDynamicIcon,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  features = [
    {
      img: LucideBrain,
      title: 'Tailored Diplomas',
      description: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
    },
    {
      img: LucideBookCheck,
      title: 'Exams',
      description: 'Access topic-specific tests including HTML, CSS, JavaScript, and more.',
    },
    {
      img: LucideMessageSquareMore,
      title: 'Smart Multi-Step Forms',
      description: 'Answer in short guided steps that save your progress as you go.',
    },
  ];
}
