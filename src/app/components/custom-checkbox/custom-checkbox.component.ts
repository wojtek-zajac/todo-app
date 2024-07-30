import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCheckboxComponent),
      multi: true
    }
  ],
  templateUrl: './custom-checkbox.component.html',
  styleUrl: './custom-checkbox.component.scss',
})
export class CustomCheckboxComponent {
  @Input() checked: boolean = false;

  private onChange: (checked: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  public toggleCheck(event: Event) {
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
  }

  public writeValue(checked: boolean): void {
    this.checked = checked;
  }

  public registerOnChange(fn: (checked: boolean) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  getAriaLabel(): string {
    return this.checked ? 'Checked' : 'Unchecked';
  }
}
