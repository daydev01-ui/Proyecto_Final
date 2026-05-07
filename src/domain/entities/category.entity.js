export default class CategoryEntity {
    constructor ({ id, name, description, color, userId }) {
        this.id = id;
        this.name = name;
        this.description = description || null;
        this.color = color || '#000000';
        this.userId = userId;
    }
}
