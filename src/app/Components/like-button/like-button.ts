import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-like-button',
  imports: [],
  templateUrl: './like-button.html',
  styleUrl: './like-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeButton {
  liked = output<void>();

  onClick() {
    this.liked.emit();
  }
}
