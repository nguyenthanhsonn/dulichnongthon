import type { DestinationItem, CreateDestinationInput, DestinationFilters, AdminActivity } from "@/types/destination-repository";
import { destinations as seedDestinations } from "@/data/mock/destinations";
import { votes as seedVotes } from "@/data/mock/votes";
import type { DestinationCategory } from "@/types/mock-destination";

export const DESTINATIONS_STORAGE_KEY = "dlnt2026:admin:destinations";
export const ACTIVITY_LOG_KEY = "dlnt2026:admin:activity-log";
export const DESTINATIONS_EVENT = "dlnt2026:destinations-changed";





export function removeVietnameseTones(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

function getSeedItems(): DestinationItem[] {
  const votesMap = new Map(seedVotes.map(v => [v.destinationId, v.votes]));
  const baseTime = 1730000000000;
  return seedDestinations.map((d, index) => ({
    ...d,
    votes: votesMap.get(d.id) ?? 0,
    hidden: false,
    deletedAt: null,
    createdAt: baseTime + index * 60000,
    updatedAt: baseTime + index * 60000,
  }));
}

function readStorage(): DestinationItem[] {
  if (typeof window === "undefined") {
    return getSeedItems();
  }
  try {
    const raw = window.localStorage.getItem(DESTINATIONS_STORAGE_KEY);
    if (!raw) {
      const seeded = getSeedItems();
      window.localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const seedMap = new Map(getSeedItems().map(s => [s.id, s]));
      return (parsed as DestinationItem[]).map(item => {
        const seed = seedMap.get(item.id);
        if (seed) {
          return {
            ...item,
            name: item.id === "NT-01" ? seed.name : item.name,
            title: seed.title || item.title,
            destinationName: seed.destinationName || item.destinationName,
            videoUrl: item.videoUrl || seed.videoUrl,
            article: item.article || seed.article,
            summary: item.id === "NT-01" ? seed.summary : item.summary,
            image: (item.id === "NT-01" || !item.image?.src) ? seed.image : item.image,
          };
        }
        return item;
      });
    }
    const seeded = getSeedItems();
    window.localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  } catch (error) {
    console.error("Lỗi khi đọc danh sách điểm đến từ localStorage:", error);
    return getSeedItems();
  }
}

function writeStorage(items: DestinationItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(DESTINATIONS_EVENT));
  } catch (error) {
    console.error("Lỗi khi ghi danh sách điểm đến vào localStorage:", error);
  }
}

export function logActivity(activity: Omit<AdminActivity, "id" | "timestamp">): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(ACTIVITY_LOG_KEY);
    const existing: AdminActivity[] = raw ? JSON.parse(raw) : [];
    const item: AdminActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now(),
      ...activity,
    };
    const updated = [item, ...existing].slice(0, 50);
    window.localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Lỗi khi lưu nhật ký hoạt động admin:", e);
  }
}

export function getActivityLogs(): AdminActivity[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ACTIVITY_LOG_KEY);
    return raw ? (JSON.parse(raw) as AdminActivity[]) : [];
  } catch {
    return [];
  }
}

function generateNextCode(items: DestinationItem[]): { id: string; recordCode: string } {
  let maxNum = 0;
  for (const item of items) {
    const match = item.id.match(/^NT-(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  }
  const nextNum = maxNum + 1;
  const padded = String(nextNum).padStart(2, "0");
  const paddedRecord = String(nextNum).padStart(3, "0");
  return {
    id: `NT-${padded}`,
    recordCode: `DLNT2026-${paddedRecord}`,
  };
}

export const destinationRepository = {
  async list(filters?: DestinationFilters): Promise<DestinationItem[]> {
    const items = readStorage();
    let result = [...items];

    if (!filters) {
      return result
        .filter(item => !item.deletedAt && !item.hidden)
        .sort((a, b) => b.votes - a.votes || a.id.localeCompare(b.id));
    }

    if (filters.status === "deleted") {
      result = result.filter(item => !!item.deletedAt);
    } else if (filters.status === "hidden") {
      result = result.filter(item => !item.deletedAt && item.hidden === true);
    } else if (filters.status === "visible") {
      result = result.filter(item => !item.deletedAt && !item.hidden);
    } else if (filters.status === "all") {
      if (!filters.includeDeleted) {
        result = result.filter(item => !item.deletedAt);
      }
    } else {
      if (!filters.includeDeleted) {
        result = result.filter(item => !item.deletedAt);
      }
      if (!filters.includeHidden) {
        result = result.filter(item => !item.hidden);
      }
    }

    if (filters.region && filters.region !== "all") {
      result = result.filter(item => item.region === filters.region);
    }

    if (filters.category && filters.category !== "all") {
      result = result.filter(item => item.category.includes(filters.category as DestinationCategory));
    }

    if (filters.search && filters.search.trim()) {
      const query = removeVietnameseTones(filters.search.trim());
      result = result.filter(item => {
        const nameClean = removeVietnameseTones(item.name);
        const provinceClean = removeVietnameseTones(item.province);
        const idClean = item.id.toLowerCase();
        const codeClean = item.recordCode.toLowerCase();
        return (
          nameClean.includes(query) ||
          provinceClean.includes(query) ||
          idClean.includes(query) ||
          codeClean.includes(query)
        );
      });
    }

    const sortBy = filters.sortBy ?? "votes";
    const sortOrder = filters.sortOrder ?? "desc";
    const orderMult = sortOrder === "asc" ? 1 : -1;

    result.sort((a, b) => {
      if (sortBy === "votes") {
        const diff = (a.votes - b.votes) * orderMult;
        return diff !== 0 ? diff : a.id.localeCompare(b.id);
      }
      if (sortBy === "code") {
        return a.id.localeCompare(b.id) * orderMult;
      }
      if (sortBy === "updatedAt") {
        return ((a.updatedAt ?? 0) - (b.updatedAt ?? 0)) * orderMult;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name, "vi") * orderMult;
      }
      return 0;
    });

    return result;
  },

  async getById(id: string): Promise<DestinationItem | null> {
    const items = readStorage();
    const found = items.find(item => item.id === id);
    return found ? { ...found } : null;
  },

  async create(input: CreateDestinationInput): Promise<DestinationItem> {
    const items = readStorage();
    const codes = generateNextCode(items);
    const now = Date.now();

    const newItem: DestinationItem = {
      id: codes.id,
      recordCode: codes.recordCode,
      name: input.name.trim(),
      fullName: input.fullName?.trim() || input.name.trim(),
      province: input.province.trim(),
      address: input.address?.trim() || input.province.trim(),
      region: input.region,
      category: input.category.length > 0 ? input.category : ["cong-dong"],
      summary: input.summary.trim(),
      highlights: input.highlights.map(h => h.trim()).filter(Boolean),
      operator: input.operator?.trim(),
      stats: input.stats || {},
      awards: (input.awards || []).map(a => a.trim()).filter(Boolean),
      image: input.image,
      votes: 0,
      hidden: false,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newItem, ...items];
    writeStorage(updated);

    logActivity({
      action: "create",
      targetCode: newItem.id,
      targetName: newItem.name,
      details: `Đăng bài thi mới: ${newItem.name} (${newItem.province})`,
    });

    return { ...newItem };
  },

  async update(id: string, input: Partial<CreateDestinationInput>): Promise<DestinationItem> {
    const items = readStorage();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy bài thi có mã ${id}`);
    }

    const current = items[index];
    const updatedItem: DestinationItem = {
      ...current,
      ...(input.name !== undefined ? { name: input.name.trim() } : {}),
      ...(input.fullName !== undefined ? { fullName: input.fullName.trim() } : {}),
      ...(input.province !== undefined ? { province: input.province.trim() } : {}),
      ...(input.address !== undefined ? { address: input.address.trim() } : {}),
      ...(input.region !== undefined ? { region: input.region } : {}),
      ...(input.category !== undefined ? { category: input.category } : {}),
      ...(input.summary !== undefined ? { summary: input.summary.trim() } : {}),
      ...(input.highlights !== undefined ? { highlights: input.highlights.map(h => h.trim()).filter(Boolean) } : {}),
      ...(input.operator !== undefined ? { operator: input.operator.trim() } : {}),
      ...(input.stats !== undefined ? { stats: input.stats } : {}),
      ...(input.awards !== undefined ? { awards: input.awards.map(a => a.trim()).filter(Boolean) } : {}),
      ...(input.image !== undefined ? { image: input.image } : {}),
      id: current.id,
      recordCode: current.recordCode,
      votes: current.votes,
      updatedAt: Date.now(),
    };

    items[index] = updatedItem;
    writeStorage(items);

    logActivity({
      action: "update",
      targetCode: updatedItem.id,
      targetName: updatedItem.name,
      details: `Cập nhật thông tin bài thi ${updatedItem.id}`,
    });

    return { ...updatedItem };
  },

  async setHidden(id: string, hidden: boolean): Promise<DestinationItem> {
    const items = readStorage();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy bài thi có mã ${id}`);
    }

    const current = items[index];
    const updatedItem: DestinationItem = {
      ...current,
      hidden,
      updatedAt: Date.now(),
    };

    items[index] = updatedItem;
    writeStorage(items);

    logActivity({
      action: hidden ? "hide" : "show",
      targetCode: updatedItem.id,
      targetName: updatedItem.name,
      details: hidden ? `Đã ẩn bài thi ${updatedItem.id} khỏi bảng xếp hạng và trang công khai` : `Đã hiển thị lại bài thi ${updatedItem.id}`,
    });

    return { ...updatedItem };
  },

  async softDelete(id: string): Promise<DestinationItem> {
    const items = readStorage();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy bài thi có mã ${id}`);
    }

    const current = items[index];
    const updatedItem: DestinationItem = {
      ...current,
      deletedAt: Date.now(),
      updatedAt: Date.now(),
    };

    items[index] = updatedItem;
    writeStorage(items);

    logActivity({
      action: "delete",
      targetCode: updatedItem.id,
      targetName: updatedItem.name,
      details: `Đã xóa mềm bài thi ${updatedItem.id} (Lượt bình chọn: ${updatedItem.votes})`,
    });

    return { ...updatedItem };
  },

  async restore(id: string): Promise<DestinationItem> {
    const items = readStorage();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Không tìm thấy bài thi có mã ${id}`);
    }

    const current = items[index];
    const updatedItem: DestinationItem = {
      ...current,
      deletedAt: null,
      updatedAt: Date.now(),
    };

    items[index] = updatedItem;
    writeStorage(items);

    logActivity({
      action: "restore",
      targetCode: updatedItem.id,
      targetName: updatedItem.name,
      details: `Khôi phục bài thi ${updatedItem.id}`,
    });

    return { ...updatedItem };
  },

  async incrementVote(id: string, count = 1): Promise<DestinationItem | null> {
    const items = readStorage();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;

    const current = items[index];
    const updatedItem: DestinationItem = {
      ...current,
      votes: Math.max(0, current.votes + count),
      updatedAt: Date.now(),
    };

    items[index] = updatedItem;
    writeStorage(items);
    return { ...updatedItem };
  },

  subscribe(callback: () => void): () => void {
    if (typeof window === "undefined") return () => {};

    const handleCustom = () => callback();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === DESTINATIONS_STORAGE_KEY || event.key === null) {
        callback();
      }
    };

    window.addEventListener(DESTINATIONS_EVENT, handleCustom);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(DESTINATIONS_EVENT, handleCustom);
      window.removeEventListener("storage", handleStorage);
    };
  },
};
