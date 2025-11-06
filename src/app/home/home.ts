import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Header } from "../Components/bars/header/header";
import { LikeButton } from "../Components/buttons/like-button/like-button";
import { SkipButton } from "../Components/buttons/skip-button/skip-button";
import { HomeCard } from "../Components/cards/home-card/home-card";

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatToolbarModule, Header, LikeButton, SkipButton, HomeCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Home {
  isLiked = signal(false);
  isSkipped = signal(false);
  isLocked = signal(false); // New signal to manage lock state (both buttons not clicked together)
  resetAnimation = signal(false); //State for reset animation

  getNextRecipe() {
    // Placeholder for fetching the next recipe logic
    console.log('Fetching next recipe...');
  }

  onLike() {
    if (this.isLocked()) return; // Prevent action if locked
    this.isLiked.set(true);
    this.isLocked.set(true); // Lock the buttons
    
    // Additional logic for liking can be added here
    setTimeout(() => {
      this.isLiked.set(false);
      this.resetAnimation.set(true); // Triggering reset animation

      setTimeout(() => {
        // I'm guessing this is where the new card is loaded after DB connected
        this.resetAnimation.set(false); // Resetting the animation state
        this.isLocked.set(false); //Unlock buttons
      },500)
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
      this.resetAnimation.set(true); // Triggering reset animation

      setTimeout(() => {
        this.resetAnimation.set(false); //Resetting animation after completion
        this.isLocked.set(false); //Unlock buttons
      },500)
      console.log('Animation reset')
    }, 800);
  }
}
