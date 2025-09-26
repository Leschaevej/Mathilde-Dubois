import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const attempts = new Map<string, number[]>();

export async function POST(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const userAttempts = attempts.get(ip) || [];
    const recentAttempts = userAttempts.filter(time => now - time < 10 * 60 * 1000);

    if (recentAttempts.length >= 3) {
        return NextResponse.json({ error: "Trop de tentatives. Réessayez dans 10 minutes." }, { status: 429 });
    }
    attempts.set(ip, [...recentAttempts, now]);

    try {
        const { nom, email, telephone, message } = await request.json();

        // Validation côté serveur
        if (!nom || nom.trim().length < 2) {
            return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return NextResponse.json({ error: "Email invalide" }, { status: 400 });
        }

        if (!telephone || telephone.trim().length < 6) {
            return NextResponse.json({ error: "Téléphone invalide" }, { status: 400 });
        }

        if (!message || message.trim().length < 10) {
            return NextResponse.json({ error: "Message trop court" }, { status: 400 });
        }
        const transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: email,
            to: 'contact@mathildedubois.fr',
            subject: `Nouveau message de ${nom}`,
            html: `
                <h3>Nouveau message depuis le site web</h3>
                <p><strong>Nom:</strong> ${nom}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Téléphone:</strong> ${telephone}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, message: 'Email envoyé avec succès' });
    } catch (error) {
        console.error('Erreur envoi email:', error);
        return NextResponse.json(
            { success: false, message: 'Erreur lors de l\'envoi de l\'email' },
            { status: 500 }
        );
    }
}