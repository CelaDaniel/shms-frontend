import { NgModule } from "@angular/core";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [SharedModule, ForgotPasswordRoutingModule],
    declarations: [ForgotPasswordComponent]
})

export class ForgotPasswordModule {}