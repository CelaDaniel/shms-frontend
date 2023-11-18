import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    exports: [FormsModule, CommonModule, ReactiveFormsModule]
})

export class SharedLibsModule {}