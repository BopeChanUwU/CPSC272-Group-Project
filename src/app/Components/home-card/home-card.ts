import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-home-card',
  imports: [MatCardModule],
  templateUrl: './home-card.html',
  styleUrl: './home-card.css'
})
export class HomeCard {

  ingredients: string[] = ['1 cup of flour', '2 eggs', '1/2 cup of sugar', '1 tsp of baking powder'];
  instructions: string[] = [
    'Preheat the oven to 350°F (175°C).',
    'In a bowl, mix the flour, sugar, and baking powder.',
    'Add the eggs and stir until smooth.',
    'Pour the batter into a greased baking pan.',
    'Bake for 30 minutes or until a toothpick comes out clean.',
    'Let it cool before serving.'
  ];
  recipeTitle: string = 'Delicious Cake';
  recipeDescription: string = 'A simple and delicious cake recipe that is perfect for any occasion.';
  creatorName: string = 'John Doe';
  creatorProfilePic:  string = 'https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=170667a&w=0&k=20&c=C0GFBgcEAPMXFFQBSK-rS2Omt9sUGImXfJE_8JOWC0M=';
  likesCount: number = 120;
  imgSrc: string = 'https://teakandthyme.com/wp-content/uploads/2024/05/jellycat-birthday-cake-DSC_9332-edit-1600.jpg';
  isLiked: boolean = false;
}
