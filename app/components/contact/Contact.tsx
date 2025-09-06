'use client';

import { useState } from 'react';
import './Contact.scss';

interface FormErrors {
    nom?: string;
    email?: string;
    telephone?: string;
    message?: string;
}

export default function Contact() {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'nom':
                if (!value.trim()) return 'Le nom est requis';
                if (value.length < 2) return 'Le nom doit contenir au moins 2 caractères';
                if (!/^[a-zA-ZÀ-ÿ\s-']+$/.test(value)) return 'Le nom ne peut contenir que des lettres';
                break;
            case 'email':
                if (!value.trim()) return 'L\'email est requis';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email invalide';
                break;
            case 'telephone':
                if (!value.trim()) return 'Le téléphone est requis';
                if (!/^[\+]?[0-9\s\-\(\)]+$/.test(value) || value.replace(/[^\d]/g, '').length < 8) {
                    return 'Numéro de téléphone invalide';
                }
                break;
            case 'message':
                if (!value.trim()) return 'Le message est requis';
                if (value.length < 10) return 'Le message doit contenir au moins 10 caractères';
                break;
        }
        return '';
    };
    const formatPhoneNumber = (value: string): string => {
        const cleaned = value.replace(/[^\d+]/g, '');
        if (cleaned.startsWith('0')) {
            const numbers = cleaned;
            if (numbers.length <= 10) {
                return numbers.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
            }
        }
        else if (cleaned.startsWith('+')) {
            if (cleaned.startsWith('+33')) {
                let phoneNumber = cleaned.slice(3);
                if (phoneNumber.startsWith('0')) {
                    phoneNumber = phoneNumber.slice(1);
                }
                if (phoneNumber) {
                    let formatted = phoneNumber;
                    if (phoneNumber.length >= 1) {
                        formatted = phoneNumber.replace(/(\d)(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/, (match, p1, p2, p3, p4, p5) => {
                            let result = p1;
                            if (p2) result += ' ' + p2;
                            if (p3) result += ' ' + p3;
                            if (p4) result += ' ' + p4;
                            if (p5) result += ' ' + p5;
                            return result;
                        });
                    }
                    return `+33 ${formatted}`.trim();
                }
                return '+33';
            }
            else {
                const match = cleaned.match(/^(\+\d{1,4})(\d*)$/);
                if (match) {
                    const [, countryCode, phoneNumber] = match;
                    if (phoneNumber) {
                        const formatted = phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
                        return `${countryCode} ${formatted}`;
                    }
                    return countryCode;
                }
            }
        }
        return cleaned;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        let formattedValue = value;
        if (name === 'telephone') {
            formattedValue = formatPhoneNumber(value);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
        
        if (hasSubmitted && errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSubmitted(true);
        const newErrors: FormErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) newErrors[key as keyof FormErrors] = error;
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted:', formData);
            setFormData({
                nom: '',
                email: '',
                telephone: '',
                message: ''
            });
            setHasSubmitted(false);
        }
    };
    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="group">
                <label htmlFor="nom">Nom</label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Nom"
                    className={errors.nom ? 'error' : ''}
                />
            </div>
            <div className="group">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={errors.email ? 'error' : ''}
                />
            </div>
            <div className="group">
                <label htmlFor="telephone">Téléphone</label>
                <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="Téléphone"
                    className={errors.telephone ? 'error' : ''}
                />
            </div>
            <div className="group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className={errors.message ? 'error' : ''}
                ></textarea>
            </div>
            <button type="submit" className="submit">
                Concrétiser vos projets
            </button>
        </form>
    );
}