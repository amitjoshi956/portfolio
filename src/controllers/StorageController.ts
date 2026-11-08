import { AppConfig } from "@config/constants";
import type { ChatMessage } from "@common/types";

export interface StoredConversation {
  id: string;
  title?: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

class StorageController {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private initDb(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === "undefined" || !window.indexedDB) {
        return reject(new Error("IndexedDB is not supported in this environment"));
      }

      const request = indexedDB.open(
        AppConfig.storage.dbName,
        AppConfig.storage.dbVersion
      );

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(AppConfig.storage.chatStoreName)) {
          const chatStore = db.createObjectStore(AppConfig.storage.chatStoreName, {
            keyPath: "id",
          });
          chatStore.createIndex("updatedAt", "updatedAt", { unique: false });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return this.dbPromise;
  }

  async saveConversation(conversation: StoredConversation): Promise<void> {
    try {
      const db = await this.initDb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(AppConfig.storage.chatStoreName, "readwrite");
        const store = tx.objectStore(AppConfig.storage.chatStoreName);
        const req = store.put(conversation);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      // Fallback or silent fail if IndexedDB fails
    }
  }

  async getConversation(id: string): Promise<StoredConversation | null> {
    try {
      const db = await this.initDb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(AppConfig.storage.chatStoreName, "readonly");
        const store = tx.objectStore(AppConfig.storage.chatStoreName);
        const req = store.get(id);
        req.onsuccess = () => {
          const result = req.result as StoredConversation | undefined;
          if (!result) return resolve(null);

          // Check 1-week TTL
          const isExpired = Date.now() - result.updatedAt > AppConfig.storage.chatTtlMs;
          if (isExpired) {
            this.deleteConversation(id);
            return resolve(null);
          }

          resolve(result);
        };
        req.onerror = () => reject(req.error);
      });
    } catch {
      return null;
    }
  }

  async deleteConversation(id: string): Promise<void> {
    try {
      const db = await this.initDb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(AppConfig.storage.chatStoreName, "readwrite");
        const store = tx.objectStore(AppConfig.storage.chatStoreName);
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      // Ignore
    }
  }

  async pruneExpiredConversations(): Promise<void> {
    try {
      const db = await this.initDb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(AppConfig.storage.chatStoreName, "readwrite");
        const store = tx.objectStore(AppConfig.storage.chatStoreName);
        const req = store.openCursor();
        const now = Date.now();

        req.onsuccess = (e) => {
          const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
          if (cursor) {
            const item = cursor.value as StoredConversation;
            if (now - item.updatedAt > AppConfig.storage.chatTtlMs) {
              cursor.delete();
            }
            cursor.continue();
          } else {
            resolve();
          }
        };
        req.onerror = () => reject(req.error);
      });
    } catch {
      // Ignore
    }
  }

  // Simple key-value storage helper for settings/flags
  getItem<T>(key: string, defaultValue: T): T {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw) as T;
    } catch {
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore
    }
  }
}

export const storageController = new StorageController();

