import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = 'orange';

  getTheme(): string {
    return this.theme;
  }

  toggleTeal(): void {
    this.theme = 'teal';
    this.setTheme();
  }

  toggleOrange(): void {
    this.theme = 'orange';
    this.setTheme();
  }

  private setTheme(): void {
    document.documentElement.style.setProperty(
      `--clr-bg`,
      `var(--clr-${this.theme})`
    );
    document.documentElement.style.setProperty(
      `--bg-img`,
      `var(--bg-${this.theme})`
    );
  }
}
