import { z } from 'zod';

const userId = z.object({
    id: z.string().uuid()
});

const createUser = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['ADMIN', 'REGULAR']),
    from_country: z.string().min(1),
    current_province: z.string().min(1),
    current_city: z.string().min(1),
    current_barangay: z.string().min(1)
});

const updateUser = z.object({
    first_name: z.string().min(1).optional(),
    last_name: z.string().min(1).optional(),
    email: z.string().email().min(1).optional(),
    password: z.string().min(1).optional(),
    role: z.enum(['ADMIN', 'REGULAR']).optional(),
    from_country: z.string().min(1).optional(),
    current_province: z.string().min(1).optional(),
    current_city: z.string().min(1).optional(),
    current_barangay: z.string().min(1).optional()
});

export {
    userId,
    createUser,
    updateUser
}