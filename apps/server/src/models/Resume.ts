import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  user: mongoose.Types.ObjectId;
  formData: any;
  aiContent: any;
  selectedTemplate: string;
  selectedPortfolioTheme: string;
  isPublic: boolean;
}

const ResumeSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  formData: { type: Object, default: {} },
  aiContent: { type: Object, default: {} },
  selectedTemplate: { type: String, default: 'modern' },
  selectedPortfolioTheme: { type: String, default: 'developer' },
  isPublic: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IResume>('Resume', ResumeSchema);
