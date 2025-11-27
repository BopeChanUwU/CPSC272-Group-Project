import { ChangeDetectionStrategy, Component, output} from '@angular/core';

@Component({
  selector: 'app-skip-button',
  imports: [],
  templateUrl: './skip-button.html',
  styleUrl: './skip-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkipButton {
  skipped = output<void>();

  onClick() {
    this.skipped.emit();
  }
}
