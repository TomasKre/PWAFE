import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAndChatComponent } from './sidebar-and-chat.component';

describe('SidebarAndChatComponent', () => {
  let component: SidebarAndChatComponent;
  let fixture: ComponentFixture<SidebarAndChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAndChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAndChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
