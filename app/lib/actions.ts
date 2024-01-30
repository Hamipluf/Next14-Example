'use server'
// ⬆  this means that all the functions that are exported in this file are executed on the server side, and are not displayed to the client
import { z } from 'zod'
import { Invoice } from './definitions'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const CreateInvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    // Here tranform the data to number because i get this from the params
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})

const CreateInvoiceFormSchema = CreateInvoiceSchema.omit({
    id: true,
    date: true
})



export async function createInvoice(formData: FormData) {
    console.log('invoice created', formData);
    const { customerId, amount, status } = CreateInvoiceFormSchema.parse(Object.fromEntries(formData.entries()))
    // To avoid errors of rounded
    const amountInCents = amount * 100
    // Create the actual date 2024-01-30, and the split method is to remove the timestamp
    const [date] = new Date().toISOString().split('T')
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}