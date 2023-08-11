import { z } from 'zod';

const userId = z.object({
    id: z.string()
})

const createUser = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(['ADMIN', 'REGULAR']),
    from_country: z.string(),
    current_province: z.string(),
    current_city: z.string(),
    current_barangay: z.string()
});

const updateUser = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(['ADMIN', 'REGULAR']).optional(),
    from_country: z.string().optional(),
    current_province: z.string().optional(),
    current_city: z.string().optional(),
    current_barangay: z.string()
})

export {
    userId,
    createUser,
    updateUser
}