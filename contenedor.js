const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
    }

    async getAll() {
        try {
            const content = await fs.promises.readFile(this.file, 'utf-8');
            const response = JSON.parse(content);
            let isArray = Array.isArray(response);
            return response;
        } catch (err) {
            throw new Error(err);
        }
    }

    async save(item) {
        try {
            const content = await this.getAll();
            const ids = content.map(item => item.id);
            const newItem = {...item};
            if (ids.length === 0) {
                newItem.id = 1;
            } else {
                newItem.id = Math.max(...ids) + 1;
            }
            content.push(newItem);
            await fs.promises.writeFile(this.file, JSON.stringify(content, null, 2));
            return newItem.id;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getById(id) {
        try {
            const content = await this.getAll();
            const item = content.filter(item => item.id === id);
            if (item.length === 0) {
                return null;
            }
            return item[0];
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteById(id) {
        try {
            const content = await this.getAll();
            const items = content.filter(item => item.id !== id);
            if (content.length !== items.length) {
                fs.promises.writeFile(this.file, JSON.stringify(items, null, 2));
            }
            console.log("se pudo eliminar")
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteAll() {
        try {
            const content = [];
            fs.promises.writeFile(this.file, JSON.stringify(content, null, 2));
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = {Contenedor};