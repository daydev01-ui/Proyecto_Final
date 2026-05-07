import CategoryService from '../../application/use-cases/category.service.js';
import { jest } from '@jest/globals';

const mockCategoryRepository = {
    save: jest.fn(),
    findByUserId: jest.fn()
};

describe('CategoryService - Pruebas Unitarias', () => {
    let categoryService;

    beforeEach(() => {
        jest.clearAllMocks();
        categoryService = new CategoryService(mockCategoryRepository);
    });

    test('Crear: debería crear y guardar una categoría correctamente', async () => {
        const data = {
            name: 'Ideas',
            description: 'Categoría para guardar mis ideas',
            color: '#FF5733',
            userId: 'user_123'
        };
        const expectedCategory = {
            id: 1,
            ...data
        };
        mockCategoryRepository.save.mockResolvedValue(expectedCategory);

        const result = await categoryService.createCategory(data);

        expect(mockCategoryRepository.save).toHaveBeenCalledTimes(1);
        expect(result.name).toBe('Ideas');
        expect(result.description).toBe('Categoría para guardar mis ideas');
        expect(result.color).toBe('#FF5733');
        expect(result.userId).toBe('user_123');
        expect(result.id).toBe(1);
    });

    test('Crear: debería fallar al crear una categoría sin nombre', async () => {
        const data = { description: 'Sin nombre' };
        await expect(categoryService.createCategory(data)).rejects.toThrow("Category name is required");
    });

    test('Leer: debería devolver las categorías de un usuario específico', async () => {
        const mockCategories = [
            { id: 1, name: 'Ideas', userId: 'user_123' },
            { id: 2, name: 'Tareas', userId: 'user_123' }
        ];
        mockCategoryRepository.findByUserId.mockResolvedValue(mockCategories);

        const result = await categoryService.getCategoriesByUserId('user_123');

        expect(mockCategoryRepository.findByUserId).toHaveBeenCalledWith('user_123');
        expect(result.length).toBe(2);
        expect(result[0].name).toBe('Ideas');
        expect(result[1].name).toBe('Tareas');
    });
});
