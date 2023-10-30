// Angular imports
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  OnDestroy,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

//  UI imports
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

// Constants and interfaces
import { DROPDOWN_OPTIONS } from './constants';
import { DropdownOptionInterface } from './interfaces';
import { Subscription } from 'rxjs';
const DEFAULT_VALUE = DROPDOWN_OPTIONS[0];

/**
 * This standalone component renders a full screen page following ABB requirements
 * Uses a signals with reactive form observable to print the selected value
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonSelect,
    IonSelectOption,
    FormsModule,
    IonCardTitle,
    IonIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnDestroy {
  // Select options
  public options: DropdownOptionInterface[] = DROPDOWN_OPTIONS;

  // Select form control

  public form: FormGroup = this.fb.group({
    customDropdown: [DEFAULT_VALUE.value, Validators.required],
  });

  // Readonly signal for template text
  public readonly labelSignal: WritableSignal<string> = signal(
    DEFAULT_VALUE.label
  );

  // Subscription to update signal
  private valueChangesSubscription: Subscription;

  /**
   * It handles value observable to set the new value in the signal
   */
  constructor(private fb: FormBuilder) {
    this.valueChangesSubscription = this.form
      .get('customDropdown')!
      .valueChanges.subscribe((value) =>
        this.labelSignal.set(this.getOptionLabel(value))
      );
  }

  /**
   * On destroy unsubscribes the value change to prevent memory leak
   */
  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }

  /**
   * By the option id retrieves the correct label
   * @param selectedValue input's value
   * @returns a translate key string
   */
  getOptionLabel(selectedValue: number | null): string {
    if (!selectedValue) {
      return 'HOME.ERROR.NO_OPTION';
    }
    const selectedOption = this.options.find(
      ({ value }) => selectedValue === value
    );
    return selectedOption ? selectedOption.label : 'HOME.ERROR.NOT_FOUND';
  }
}
