import { DataTypes } from "sequelize";
import sequelize from "./connection.js";

const CategoryModel = sequelize.define("Category", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    color: { type: DataTypes.STRING, defaultValue: '#000000' },
    userId: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

export default class CategoryMySQLRepository {
    async save(categoryEntity) {
        const category = await CategoryModel.create({
            name: categoryEntity.name,
            description: categoryEntity.description,
            color: categoryEntity.color,
            userId: categoryEntity.userId
        });
        return category.toJSON();
    }

    async findByUserId(userId) {
        return await CategoryModel.findAll({ where: { userId } });
    }

    async findById(id) {
        const category = await CategoryModel.findByPk(id);
        return category ? category.toJSON() : null;
    }

    async update(id, data) {
        const category = await CategoryModel.findByPk(id);
        if (!category) return null;
        await category.update(data);
        return category.toJSON();
    }

    async delete(id) {
        const category = await CategoryModel.findByPk(id);
        if (!category) return null;
        await category.destroy();
        return true;
    }
}
