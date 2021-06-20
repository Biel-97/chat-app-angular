import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLeaveRoomComponent } from './dialog-leave-room.component';

describe('DialogLeaveRoomComponent', () => {
  let component: DialogLeaveRoomComponent;
  let fixture: ComponentFixture<DialogLeaveRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLeaveRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLeaveRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
