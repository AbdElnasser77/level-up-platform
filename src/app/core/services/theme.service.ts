import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  toggleDark(): void {
    document.documentElement.classList.toggle('dark');
  }

  isDark(): boolean {
    return document.documentElement.classList.contains('dark');
  }
}
