import { Component, signal, input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Header } from "../Components/header/header";
import { LikeButton } from "../Components/like-button/like-button";
import { SkipButton } from "../Components/skip-button/skip-button";

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatToolbarModule, Header, LikeButton, SkipButton],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Home {
  isLiked = signal(false);
  isSkipped = signal(false);
  isLocked = signal(false); // New signal to manage lock state (both buttons not clicked together)

  onLike() {
    if (this.isLocked()) return; // Prevent action if locked
    this.isLiked.set(true);
    this.isLocked.set(true); // Lock the buttons
    // Additional logic for liking can be added here
    setTimeout(() => {
      this.isLiked.set(false);
      this.isLocked.set(false); // Unlock the buttons
      console.log('Animation reset')
    }, 800);
  
  }

  onSkip() {
    if (this.isLocked()) return; // Prevent action if locked
    this.isSkipped.set(true);
    this.isLocked.set(true); // Lock the buttons
    // Additional logic for skipping can be added here
    setTimeout(() => {
      this.isSkipped.set(false);
      this.isLocked.set(false); // Unlock the buttons
      console.log('Animation reset')
    }, 800);
  //Plan to add a reset transition after animation completes. New card comes in from the bottom and sits in the center
  }
}
