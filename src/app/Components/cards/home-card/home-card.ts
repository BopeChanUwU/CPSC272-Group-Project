import { Component, Input, signal } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-card',
  imports: [MatCardModule, CommonModule],
  standalone: true,
  templateUrl: './home-card.html',
  styleUrl: './home-card.css'
})
export class HomeCard {
  @Input() isLiked: boolean = false;
  @Input() isSkipped: boolean = false;
  @Input() resetAnimation: boolean = false;

  // Recipe data properties
  @Input() recipe = signal<any>(null);
  defaultImage = 'https://www.shutterstock.com/image-vector/image-not-found-failure-network-260nw-2330163829.jpg';

  get displayImageSrc(): string {
    if (this.recipe().image_url && this.recipe().image_url.startsWith('data:image')) {
      return this.recipe().image_url;
    } else if (this.recipe().image_url) {
      return this.recipe().image_url;
    } else {
      return this.defaultImage;
    }
  }

  onImageError() {
    this.recipe.update((current) => ({
      ...current,
      image_url: this.defaultImage,
    }));
  }

  ngOnChanges() {
    console.log('Recipe updated in HomeCard:', this.recipe());
  }
}