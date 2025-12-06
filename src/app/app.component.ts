import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Footer } from "@layout/footer/footer";
import { invoke } from "@tauri-apps/api/core";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Footer],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {}
