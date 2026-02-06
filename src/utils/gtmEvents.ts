declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export const trackPhoneClick = (phoneNumber: string, location: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'phone_click',
      phone_number: phoneNumber,
      location: location
    });
  }
};

export const trackSocialShare = (platform: string, location: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'social_share',
      platform: platform,
      location: location
    });
  }
};

export const trackFormSubmission = (formType: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'form_submission',
      form_type: formType
    });
  }
};
