import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  examId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Exam', 
    required: true 
  },
  
  // ... üst satırlar aynı
  
  // Sınavın Adı, Seviyesi, Tarihi
  examTitle: { type: String }, 
  examLevel: { type: String },
  examDate: { type: Date },

  
  examCity: { type: String },     
  examLocation: { type: String },  
  // ----------------------------------------------



  candidate: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    pass: {type:String, required:true},
    identityNumber: { type: String, required: true },
    address: { type: String, required: true }
  },

  price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'PAID', 'FAILED'], 
    default: 'PENDING' 
  },
  
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);