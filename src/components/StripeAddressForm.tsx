import React, { useState, useEffect } from 'react';
import { AddressElement } from '@stripe/react-stripe-js';
import { StripeAddressElementChangeEvent } from '@stripe/stripe-js';

interface AddressData {
  name: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    postal_code: string;
    country: string;
  };
}

interface StripeAddressFormProps {
  onAddressChange: (data: {
    name: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  }) => void;
  defaultValues?: {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
}

const StripeAddressForm: React.FC<StripeAddressFormProps> = ({ onAddressChange, defaultValues }) => {
  const handleChange = (event: StripeAddressElementChangeEvent) => {
    if (event.complete && event.value) {
      const { name, phone, address } = event.value;
      onAddressChange({
        name: name || '',
        phone: phone || '',
        address: address.line1 + (address.line2 ? `, ${address.line2}` : ''),
        city: address.city,
        postalCode: address.postal_code,
      });
    }
  };

  return (
    <div className="stripe-address-wrapper">
      <AddressElement
        options={{
          mode: 'shipping',
          allowedCountries: ['FR'],
          fields: {
            phone: 'always',
          },
          validation: {
            phone: {
              required: 'never',
            },
          },
          display: {
            name: 'split',
          },
          defaultValues: defaultValues ? {
            name: defaultValues.name,
            phone: defaultValues.phone,
            address: {
              line1: defaultValues.address || '',
              city: defaultValues.city || '',
              postal_code: defaultValues.postalCode || '',
              country: 'FR',
            },
          } : undefined,
        }}
        onChange={handleChange}
      />
      <style>{`
        .stripe-address-wrapper .StripeElement {
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
        }
        .stripe-address-wrapper .StripeElement--focus {
          border-color: #FF9900;
          box-shadow: 0 0 0 2px rgba(255, 153, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default StripeAddressForm;
