import Settings from '../models/Settings.js';

export const getSettings = async (request, response, next) => {
  try {
    const settings = await Settings.getSettings();
    response.status(200).json({ success: true, message: 'Settings fetched successfully.', data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (request, response, next) => {
  try {
    const { companyName, tagline, description, whatsapp, phone, email, address } = request.body;
    
    const settings = await Settings.getSettings();
    
    if (companyName !== undefined) settings.companyName = companyName;
    if (tagline !== undefined) settings.tagline = tagline;
    if (description !== undefined) settings.description = description;
    if (whatsapp !== undefined) settings.whatsapp = whatsapp;
    if (phone !== undefined) settings.phone = phone;
    if (email !== undefined) settings.email = email;
    if (address !== undefined) settings.address = address;
    
    if (request.file) {
      settings.logo = request.file.url;
    }
    
    const updatedSettings = await settings.save();
    
    response.status(200).json({ success: true, message: 'Settings updated successfully.', data: updatedSettings });
  } catch (error) {
    next(error);
  }
};
