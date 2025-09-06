import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { nom, email, telephone, message } = await request.json();
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