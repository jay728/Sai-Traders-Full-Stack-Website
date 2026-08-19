import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'SAI TRADER'
  },
  tagline: {
    type: String,
    default: 'B2B Decorative Coating Solutions'
  },
  description: {
    type: String,
    default: 'Premium vacuum metallising and decorative coating services for PP and ABS plastic components.'
  },
  whatsapp: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Singleton pattern - only one settings document
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
