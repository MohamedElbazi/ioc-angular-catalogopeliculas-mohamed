import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  contrasenya: string = '';
  errorMessage: string = '';
  returnUrl: string = '/preferits';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const queryUrl = this.route.snapshot.queryParams['returnUrl'];
    if (queryUrl) {
      this.returnUrl = queryUrl;
    }
  }

  onSubmit() {
    if (this.authService.login(this.email, this.contrasenya)) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.errorMessage = 'Credencials incorrectes';
    }
  }
}
