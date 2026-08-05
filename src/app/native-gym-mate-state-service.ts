import { DestroyRef, Injectable, inject } from '@angular/core';

type NativeAction = 'openMenu' | 'saveGymMateState' | 'getGymMateState' | 'deleteGymMateState';

interface NativeRequest {
  action: NativeAction;
  requestId: string;
  value?: unknown;
}

interface NativeResponse<T = unknown> {
  action: NativeAction;
  requestId?: string;
  ok: boolean;
  value?: T;
  error?: string;
}

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        nativeApp?: {
          postMessage: (message: NativeRequest) => void;
        };
      };
    };
  }
}

@Injectable({ providedIn: 'root' })
export class NativeGymMateStateService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly pending = new Map<
    string,
    {
      resolve: (value: unknown) => void;
      reject: (reason?: unknown) => void;
    }
  >();

  constructor() {
    const handleNativeResponse = (event: Event) => {
      const response = (event as CustomEvent<NativeResponse>).detail;
      if (!response?.requestId) {
        return;
      }

      const pending = this.pending.get(response.requestId);
      if (!pending) {
        return;
      }

      this.pending.delete(response.requestId);
      if (response.ok) {
        pending.resolve(response.value);
      } else {
        pending.reject(new Error(response.error ?? 'Native request failed'));
      }
    };

    window.addEventListener('gymMateNativeResponse', handleNativeResponse);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('gymMateNativeResponse', handleNativeResponse);
    });
  }

  openMenu(): Promise<{ menuOpen: boolean }> {
    return this.post<{ menuOpen: boolean }>('openMenu');
  }

  save(state: unknown): Promise<{ saved: boolean }> {
    return this.post<{ saved: boolean }>('saveGymMateState', state);
  }

  get<T = unknown>(): Promise<T> {
    return this.post<T>('getGymMateState');
  }

  delete(): Promise<{ deleted: boolean }> {
    return this.post<{ deleted: boolean }>('deleteGymMateState');
  }

  private post<T>(action: NativeAction, value?: unknown): Promise<T> {
    const nativeApp = window.webkit?.messageHandlers?.nativeApp;
    if (!nativeApp) {
      return Promise.reject(new Error('nativeApp bridge is not available'));
    }

    const requestId = crypto.randomUUID();
    const message: NativeRequest = { action, requestId, value };

    return new Promise<T>((resolve, reject) => {
      this.pending.set(requestId, {
        resolve: (result) => resolve(result as T),
        reject,
      });

      nativeApp.postMessage(message);
    });
  }
}

// Example usage from an Angular component:
//
// await this.nativeGymMateState.openMenu();
// await this.nativeGymMateState.save({ profile: { name: 'Foro' }, history: [] });
// const state = await this.nativeGymMateState.get();
// await this.nativeGymMateState.delete();
