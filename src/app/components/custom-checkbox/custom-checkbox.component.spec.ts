import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCheckboxComponent } from './custom-checkbox.component';

describe('CustomCheckboxComponent', () => {
  let component: CustomCheckboxComponent;
  let fixture: ComponentFixture<CustomCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, CustomCheckboxComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with checked set to false', () => {
    expect(component.checked).toBeFalse();
  });

  it('should toggle checked state when toggleCheck is called', () => {
    component.toggleCheck(new Event('click'));
    expect(component.checked).toBeTrue();
    
    component.toggleCheck(new Event('click'));
    expect(component.checked).toBeFalse();
  });

  it('should set checked state when writeValue is called', () => {
    component.writeValue(true);
    expect(component.checked).toBeTrue();
    
    component.writeValue(false);
    expect(component.checked).toBeFalse();
  });

  it('should call the registered onChange callback when toggleCheck is called', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);
    
    component.toggleCheck(new Event('click'));
    expect(onChangeSpy).toHaveBeenCalledWith(true);

    component.toggleCheck(new Event('click'));
    expect(onChangeSpy).toHaveBeenCalledWith(false);
  });

  it('should call the registered onTouched callback when toggleCheck is called', () => {
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnTouched(onTouchedSpy);
    
    component.toggleCheck(new Event('click'));
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should return "Checked" when checked is true', () => {
    component.checked = true;
    expect(component.getAriaLabel()).toBe('Checked');
  });

  it('should return "Unchecked" when checked is false', () => {
    component.checked = false;
    expect(component.getAriaLabel()).toBe('Unchecked');
  });
});
