const API_URL = 'http://localhost:3000/api/v1/tasks';

export const taskApi = {
    async getAll() {
        const res = await fetch(API_URL);
        return await res.json();
    },

    async create(title) {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        if (!res.ok) throw new Error('Error al crear la tarea');
        return await res.json();
    },

    async delete(id) {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Error al borrar');
    }
};