// angular import
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent {
  constructor(private router : Router) {}

  password: string = '';
  username: string = '';

  signIn() : void {
    if (this.username && this.password)
    {
      this.router.navigate(['/home']);
    }
  }
  
}
