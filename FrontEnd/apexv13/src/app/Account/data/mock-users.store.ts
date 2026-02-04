import { User } from 'app/shared/Model/user';

const STORAGE_KEY = 'mock_users_v1';

function seedUsers(): User[] {
  return [
    {
      id: 1,
      userName: 'damon',
      password: null,
      fullname: 'Damon Pinheiro',
      email: 'damon@local.test',
      status: true,
    },
    {
      id: 2,
      userName: 'admin.oficina',
      password: null,
      fullname: 'Admin Oficina',
      email: 'admin@local.test',
      status: true,
    },
    {
      id: 3,
      userName: 'atendente.01',
      password: null,
      fullname: 'Atendente 01',
      email: 'atendente01@local.test',
      status: true,
    },
    {
      id: 4,
      userName: 'mecanico.01',
      password: null,
      fullname: 'Mecânico 01',
      email: 'mecanico01@local.test',
      status: true,
    },
    {
      id: 5,
      userName: 'inativo.01',
      password: null,
      fullname: 'Usuário Inativo',
      email: 'inativo01@local.test',
      status: false,
    },
  ];
}

function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedUsers();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      const seeded = seedUsers();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }

    return parsed as User[];
  } catch {
    const seeded = seedUsers();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export class MockUsersStore {
  static getAll(): User[] {
    return loadUsers();
  }

  static getById(id: number): User | null {
    const users = loadUsers();
    return users.find(u => u.id === id) ?? null;
  }

  static upsert(user: User): User {
    const users = loadUsers();

    if (user.id && user.id !== 0) {
      const index = users.findIndex(u => u.id === user.id);
      if (index >= 0) {
        users[index] = { ...users[index], ...user };
        saveUsers(users);
        return users[index];
      }
    }

    const nextId = users.reduce((maxId, u) => Math.max(maxId, u.id ?? 0), 0) + 1;
    const created: User = { ...user, id: nextId };
    users.push(created);
    saveUsers(users);
    return created;
  }

  static delete(id: number): void {
    const users = loadUsers().filter(u => u.id !== id);
    saveUsers(users);
  }
}
