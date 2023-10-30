import {
  ChangeDetectionStrategy,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

// Constants
import { DROPDOWN_OPTIONS } from './constants';

// Component on test
import { HomePage } from './home.page';

// Fake loader to override the translation service
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
        ReactiveFormsModule,
        HomePage,
      ],
    })
      .overrideComponent(HomePage, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and have default option selected', async () => {
    const selectedValue = component.valueControl.value;
    expect(component).toBeTruthy();
    expect(selectedValue).toEqual(DROPDOWN_OPTIONS[0].value);
    expect(component.labelSignal()).toEqual(DROPDOWN_OPTIONS[0].label);
  });

  describe('#getOptionLabel', () => {
    it('should return not found key', () => {
      expect(component.getOptionLabel(123123)).toBe('HOME.ERROR.NOT_FOUND');
    });

    it('should return not option key', () => {
      expect(component.getOptionLabel(null)).toBe('HOME.ERROR.NO_OPTION');
    });

    it('should return two random option keys', () => {
      const getOption = () =>
        DROPDOWN_OPTIONS[Math.floor(Math.random() * DROPDOWN_OPTIONS.length)];
      const options = [getOption(), getOption()];
      for (const option of options) {
        expect(component.getOptionLabel(option.value)).toBe(option.label);
      }
    });
  });
});
