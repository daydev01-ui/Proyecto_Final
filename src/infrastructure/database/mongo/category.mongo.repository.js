import CategoryModel from "./category.model.js";

export default class CategoryMongoRepository {
    async save(categoryEntity) {
        const category = new CategoryModel({
            name: categoryEntity.name,
            description: categoryEntity.description,
            color: categoryEntity.color,
            userId: categoryEntity.userId
        });
        const savedCategory = await category.save();
        return savedCategory.toObject();
    }

    async findByUserId(userId) {
        return await CategoryModel.find({ userId });
    }

    async findById(id) {
        return await CategoryModel.findById(id);
    }

    async update(id, data) {
        return await CategoryModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await CategoryModel.findByIdAndDelete(id);
    }
}
