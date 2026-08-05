import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './ls';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
    consoleErrorSpy = spyOn(console, 'error');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('stores and reads JSON values', () => {
    const value = {
      name: 'push day',
      activities: [
        { id: 'b2', sets: [{ reps: 10, size: 60 }] },
        { id: 'sh5', sets: [{ reps: 12, size: 10 }] },
      ],
    };

    service.setItem('session', value);

    expect(localStorage.getItem('session')).toBe(JSON.stringify(value));
    expect(service.getItem<typeof value>('session')).toEqual(value);
  });

  it('returns null when a JSON key is missing', () => {
    expect(service.getItem('missing')).toBeNull();
  });

  it('stores JSON values as base64', () => {
    const value = { id: 'b2', reps: 10 };

    service.setItemBase64('session', value);

    const storedValue = localStorage.getItem('session');
    expect(storedValue).toBe(btoa(JSON.stringify(value)));
    expect(storedValue ? JSON.parse(atob(storedValue)) : null).toEqual(value);
  });

  it('compresses and uncompresses URL-safe values', () => {
    const value = {
      note: 'Incline bench, shoulder press, face pull',
      count: 3,
      completed: true,
    };

    const compressed = service.getCompressed(value);

    expect(compressed).toBeTruthy();
    expect(compressed).toBe(encodeURIComponent(decodeURIComponent(compressed ?? '')));
    expect(service.getUncompressed<typeof value>(compressed)).toEqual(value);
  });

  it('logs and returns null when compressed data cannot be decoded', () => {
    expect(service.getUncompressed('%E0%A4%A')).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('logs and returns null when stored JSON is invalid', () => {
    localStorage.setItem('session', '{not valid json');

    expect(service.getItem('session')).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('logs errors when JSON serialization fails', () => {
    const circularValue: { self?: unknown } = {};
    circularValue.self = circularValue;

    service.setItem('session', circularValue);

    expect(localStorage.getItem('session')).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('removes items and clears storage', () => {
    localStorage.setItem('one', '1');
    localStorage.setItem('two', '2');

    service.removeItem('one');

    expect(localStorage.getItem('one')).toBeNull();
    expect(localStorage.getItem('two')).toBe('2');

    service.clear();

    expect(localStorage.length).toBe(0);
  });
});
