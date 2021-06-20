import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogParticipantSettingsComponent } from './dialog-participant-settings.component';

describe('DialogParticipantSettingsComponent', () => {
  let component: DialogParticipantSettingsComponent;
  let fixture: ComponentFixture<DialogParticipantSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogParticipantSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogParticipantSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
