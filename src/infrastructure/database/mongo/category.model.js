import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    color: { type: String, default: '#000000' },
    userId: { type: String, required: true }
}, { timestamps: true });

export default model('Category', categorySchema);
