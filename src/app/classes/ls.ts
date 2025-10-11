import { Injectable } from '@angular/core';
import * as LZString from 'lz-string';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  // Set item in local storage
  setItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  // Set item base64 in local storage
  setItemBase64(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, btoa(jsonValue));
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }
  getCompressed(value: any) : string | null {
    try {
      let jsonValue = JSON.stringify(value);
      jsonValue = LZString.compressToBase64(jsonValue);
      return encodeURIComponent(jsonValue);
    } catch (error) {
      console.error('Error saving to local storage', error);
      return null
    }
  }
  getUncompressed<T>(value: any): T | null {
    try {
      let decode = decodeURIComponent(value);
      decode = LZString.decompressFromBase64(decode);
      return value ? JSON.parse(decode) : null;
    } catch (error) {
      console.error('Error reading from local storage', error);
      return null;
    }
  }

  // Get item from local storage
  getItem<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from local storage', error);
      return null;
    }
  }

  // Remove item from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  // Clear all local storage
  clear(): void {
    localStorage.clear();
  }
}
