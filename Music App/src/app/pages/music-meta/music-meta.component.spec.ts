import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicMetaComponent } from './music-meta.component';

describe('MusicMetaComponent', () => {
  let component: MusicMetaComponent;
  let fixture: ComponentFixture<MusicMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
