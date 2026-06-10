/**
 * lib/history.ts
 *
 * localStorage tabanlı oyun geçmişi yönetimi.
 * Okuma, yazma ve temizleme fonksiyonlarını barındırır.
 */

import { GameRecord } from '../types';
import { MAX_HISTORY_RECORDS } from './constants';

const STORAGE_KEY = 'dreamxi_history';

/**
 * localStorage'dan geçmiş kayıtları okur.
 * Hatalı/bozuk veriyi güvenli şekilde filtreler.
 */
export function loadHistory(): GameRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Tekrar eden ID'leri temizle
    const uniqueMap = new Map<string, GameRecord>();
    parsed.forEach((item: GameRecord) => {
      if (item && item.id && !uniqueMap.has(item.id)) {
        uniqueMap.set(item.id, item);
      }
    });
    return Array.from(uniqueMap.values());
  } catch {
    return [];
  }
}

/**
 * Mevcut geçmişe yeni bir kayıt ekler.
 * MAX_HISTORY_RECORDS limitini aşarsa en eskiyi siler.
 * Yeni kaydı başa ekler (en yeni en üstte).
 */
export function saveRecord(newRecord: GameRecord): GameRecord[] {
  const existing = loadHistory();
  const combined = [newRecord, ...existing];

  const uniqueMap = new Map<string, GameRecord>();
  combined.forEach(item => {
    if (!uniqueMap.has(item.id)) uniqueMap.set(item.id, item);
  });

  const updated = Array.from(uniqueMap.values()).slice(0, MAX_HISTORY_RECORDS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Depolama doluysa sessizce geç
  }

  return updated;
}

/**
 * Tüm geçmişi kalıcı olarak siler.
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Geçmişi normalize edip tekrar kaydeder (migration/clean-up senaryoları için).
 */
export function normalizeAndSave(records: GameRecord[]): GameRecord[] {
  const uniqueMap = new Map<string, GameRecord>();
  records.forEach(item => {
    if (item && item.id && !uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  });
  const cleaned = Array.from(uniqueMap.values()).slice(0, MAX_HISTORY_RECORDS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  } catch { /* ignore */ }
  return cleaned;
}
